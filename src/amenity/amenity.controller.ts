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
import { AmenityService } from './amenity.service';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';
import { Amenity as AmenityEntity } from './entities/amenity.entity';

@Controller('amenity')
@ApiTags('amenity')
export class AmenityController {
  constructor(private readonly amenityService: AmenityService) {}

  @Post()
  @ApiCreatedResponse({ type: AmenityEntity })
  create(@Body() createAmenityDto: CreateAmenityDto) {
    return this.amenityService.create(createAmenityDto);
  }

  @Get()
  @ApiOkResponse({ type: AmenityEntity, isArray: true })
  findAll() {
    return this.amenityService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: AmenityEntity })
  findOne(@Param('id') id: string) {
    return this.amenityService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: AmenityEntity })
  update(@Param('id') id: string, @Body() updateAmenityDto: UpdateAmenityDto) {
    return this.amenityService.update(+id, updateAmenityDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: AmenityEntity })
  remove(@Param('id') id: string) {
    return this.amenityService.remove(+id);
  }
}
