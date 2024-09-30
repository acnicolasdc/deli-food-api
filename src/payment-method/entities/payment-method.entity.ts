import { PaymentMethod as PaymentMethodPrisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentMethod implements PaymentMethodPrisma {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;
}
