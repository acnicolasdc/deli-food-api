import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceTypeDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;
}
