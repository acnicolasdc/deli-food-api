import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { SupabaseService } from '@src/supabase/supabase.service';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category as CategoryEntity } from './entities/category.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly supabaseService: SupabaseService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CategoryEntity })
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body(new ValidationPipe()) createCategoryDto: CreateCategoryDto,
  ) {
    const imageUrl = await this.supabaseService.uploadImage(file, 'category');
    return this.categoryService.create({
      ...createCategoryDto,
      icon: imageUrl,
    });
  }

  @Get()
  @ApiOkResponse({ type: CategoryEntity, isArray: true })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: CategoryEntity })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: CategoryEntity })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: CategoryEntity })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
