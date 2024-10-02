import { PartialType } from '@nestjs/swagger';
import { CreateCardinalPointDto } from './create-cardinal-point.dto';

export class UpdateCardinalPointDto extends PartialType(
  CreateCardinalPointDto,
) {}
