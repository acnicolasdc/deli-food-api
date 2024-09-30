import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
  @ApiProperty({ required: true })
  name: string;
}
