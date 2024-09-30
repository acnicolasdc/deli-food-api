import { Amenity as AmenityPrisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Amenity implements AmenityPrisma {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;
}
