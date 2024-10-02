import { CardinalPoint as CardinalPointPrisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CardinalPoint implements CardinalPointPrisma {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;

  @ApiProperty()
  cityId: number;
}
