import { Headquarter as HeadquarterPrisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Headquarter implements HeadquarterPrisma {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  customerId: number;

  @ApiProperty()
  zoneId: number;

  @ApiProperty()
  amenities: string[];
}
