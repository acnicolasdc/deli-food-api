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
import { ServiceTypeService } from './service-type.service';
import { CreateServiceTypeDto } from './dto/create-service-type.dto';
import { UpdateServiceTypeDto } from './dto/update-service-type.dto';
import { ServiceType as ServiceTypeEntity } from './entities/service-type.entity';

@Controller('service-type')
@ApiTags('service-type')
export class ServiceTypeController {
  constructor(private readonly serviceTypeService: ServiceTypeService) {}

  @Post()
  @ApiCreatedResponse({ type: ServiceTypeEntity })
  create(@Body() createServiceTypeDto: CreateServiceTypeDto) {
    return this.serviceTypeService.create(createServiceTypeDto);
  }

  @Get()
  @ApiOkResponse({ type: ServiceTypeEntity, isArray: true })
  findAll() {
    return this.serviceTypeService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ServiceTypeEntity })
  findOne(@Param('id') id: string) {
    return this.serviceTypeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ServiceTypeEntity })
  update(
    @Param('id') id: string,
    @Body() updateServiceTypeDto: UpdateServiceTypeDto,
  ) {
    return this.serviceTypeService.update(+id, updateServiceTypeDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ServiceTypeEntity })
  remove(@Param('id') id: string) {
    return this.serviceTypeService.remove(+id);
  }
}
