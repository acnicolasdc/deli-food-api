import { ApiProperty } from '@nestjs/swagger';

export class CreateAmenityDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  icon: string;
}
