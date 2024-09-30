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
  public readonly BUCKET_BASE_URI = `${process.env.SUPABASE_URL}/storage/v1/s3/${process.env.SUPABASE_BUCKET_NAME}`;
  async uploadImage(
    file: Express.Multer.File,
    folder: string,
  ): Promise<string> {
    const { buffer } = file;
    const uniqueFileName = `${folder}/${uuidv4()}-${file.originalname}`;

    const { error } = await this.supabase.storage
      .from(this.BUCKET_NAME)
      .upload(uniqueFileName, buffer);

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
