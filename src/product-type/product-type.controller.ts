import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ProductTypeService } from './product-type.service';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { ProductType as ProductTypeEntity } from './entities/product-type.entity';

@Controller('product-type')
@ApiTags('product-type')
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}

  @Post()
  @ApiCreatedResponse({ type: ProductTypeEntity })
  create(@Body() createProductTypeDto: CreateProductTypeDto) {
    return this.productTypeService.create(createProductTypeDto);
  }

  @Get()
  @ApiOkResponse({ type: ProductTypeEntity, isArray: true })
  findAll() {
    return this.productTypeService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductTypeEntity })
  findOne(@Param('id') id: string) {
    return this.productTypeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ProductTypeEntity })
  update(
    @Param('id') id: string,
    @Body() updateProductTypeDto: UpdateProductTypeDto,
  ) {
    return this.productTypeService.update(+id, updateProductTypeDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ProductTypeEntity })
  remove(@Param('id') id: string) {
    return this.productTypeService.remove(+id);
  }
}
