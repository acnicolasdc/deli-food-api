import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { PrismaModule } from '@src/prisma/prisma.module';
import { CategoryController } from './category.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
