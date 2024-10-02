import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ZoneService } from './zone.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { Zone as ZoneEntity } from './entities/zone.entity';
import { FindAllQueryParamDto } from './dto/find-all-query-param-type.dto';

@Controller('zone')
@ApiTags('zone')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}

  @Post()
  @ApiCreatedResponse({ type: ZoneEntity })
  create(@Body() createZoneDto: CreateZoneDto) {
    return this.zoneService.create(createZoneDto);
  }

  @Get()
  @ApiOkResponse({ type: ZoneEntity, isArray: true })
  findAll(@Query() { cardinalPointId }: FindAllQueryParamDto) {
    return this.zoneService.findAll(cardinalPointId);
  }

  @Get(':id')
  @ApiOkResponse({ type: ZoneEntity })
  findOne(@Param('id') id: string) {
    return this.zoneService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ZoneEntity })
  update(@Param('id') id: string, @Body() updateZoneDto: UpdateZoneDto) {
    return this.zoneService.update(+id, updateZoneDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ZoneEntity })
  remove(@Param('id') id: string) {
    return this.zoneService.remove(+id);
  }
}
