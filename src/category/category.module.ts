import { Module } from '@nestjs/common';
import { PrismaModule } from '@src/prisma/prisma.module';
import { SupabaseService } from '@src/supabase/supabase.service';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryController],
  providers: [SupabaseService, CategoryService],
})
export class CategoryModule {}
