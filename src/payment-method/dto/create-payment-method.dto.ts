import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentMethodDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  icon: string;
}
