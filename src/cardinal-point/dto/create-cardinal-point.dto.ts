import { ApiProperty } from '@nestjs/swagger';

export class CreateCardinalPointDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;

  @ApiProperty()
  cityIds?: number[];
}
