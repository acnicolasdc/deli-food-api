import { City as CityPrisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class City implements CityPrisma {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
