import Jimp from 'jimp';
import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
    );
  }
  public readonly BUCKET_NAME = process.env.SUPABASE_BUCKET_NAME;

  private async convertHeicToPng(fileBuffer: Buffer): Promise<Buffer> {
    try {
      const image = await Jimp.Jimp.read(fileBuffer);
      return await image.getBuffer(Jimp.JimpMime.png);
    } catch {
      throw new Error('Error converting HEIC to PNG');
    }
  }
  async uploadImage(
    file: Express.Multer.File,
    folder: string,
  ): Promise<string> {
    const fileBuffer = file.buffer;
    const fileExtension = file.originalname.split('.').pop();
    const uniqueFileName = `${folder}/${uuidv4()}.${fileExtension}`;
    const { error } = await this.supabase.storage
      .from(this.BUCKET_NAME)
      .upload(uniqueFileName, fileBuffer, {
        cacheControl: '3600',
        upsert: false,
      });
    if (error) {
      throw new Error('Error uploading file');
    }
    const response = this.supabase.storage
      .from(this.BUCKET_NAME)
      .getPublicUrl(uniqueFileName);

    if (!response.data.publicUrl) {
      throw new Error('Error generating public URL');
    }
    return response.data.publicUrl;
  }
}
