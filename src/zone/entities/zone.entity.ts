import { Zone as ZonePrisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Zone implements ZonePrisma {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;

  @ApiProperty()
  cityId: number;
}
