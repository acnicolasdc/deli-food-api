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
import { HeadquarterService } from './headquarter.service';
import { CreateHeadquarterDto } from './dto/create-headquarter.dto';
import { UpdateHeadquarterDto } from './dto/update-headquarter.dto';
import { Headquarter as HeadquarterEntity } from './entities/headquarter.entity';

@Controller('headquarter')
@ApiTags('headquarter')
export class HeadquarterController {
  constructor(private readonly headquarterService: HeadquarterService) {}

  @Post()
  @ApiCreatedResponse({ type: HeadquarterEntity })
  create(@Body() createAmenityDto: CreateHeadquarterDto) {
    return this.headquarterService.create(createAmenityDto);
  }

  @Get()
  @ApiOkResponse({ type: HeadquarterEntity, isArray: true })
  findAll() {
    return this.headquarterService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: HeadquarterEntity })
  findOne(@Param('id') id: string) {
    return this.headquarterService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: HeadquarterEntity })
  update(
    @Param('id') id: string,
    @Body() updateAmenityDto: UpdateHeadquarterDto,
  ) {
    return this.headquarterService.update(+id, updateAmenityDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: HeadquarterEntity })
  remove(@Param('id') id: string) {
    return this.headquarterService.remove(+id);
  }
}
