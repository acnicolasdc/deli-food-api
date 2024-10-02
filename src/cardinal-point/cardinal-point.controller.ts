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
import { CardinalPointService } from './cardinal-point.service';
import { CreateCardinalPointDto } from './dto/create-cardinal-point.dto';
import { UpdateCardinalPointDto } from './dto/update-cardinal-point.dto';
import { CardinalPoint as CardinalPointEntity } from './entities/cardinal-point.entity';
import { FindAllQueryParamDto } from './dto/find-all-query-param-type.dto';

@Controller('cardinal-point')
@ApiTags('cardinal-point')
export class CardinalPointController {
  constructor(private readonly cardinalPointService: CardinalPointService) {}

  @Post()
  @ApiCreatedResponse({ type: CardinalPointEntity })
  create(@Body() createCardinalPointDto: CreateCardinalPointDto) {
    return this.cardinalPointService.create(createCardinalPointDto);
  }

  @Get()
  @ApiOkResponse({ type: CardinalPointEntity, isArray: true })
  findAll(@Query() { cityId }: FindAllQueryParamDto) {
    return this.cardinalPointService.findAll(cityId);
  }

  @Get(':id')
  @ApiOkResponse({ type: CardinalPointEntity })
  findOne(@Param('id') id: string) {
    return this.cardinalPointService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: CardinalPointEntity })
  update(
    @Param('id') id: string,
    @Body() updateCardinalPointDto: UpdateCardinalPointDto,
  ) {
    return this.cardinalPointService.update(+id, updateCardinalPointDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: CardinalPointEntity })
  remove(@Param('id') id: string) {
    return this.cardinalPointService.remove(+id);
  }
}
