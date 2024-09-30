import { ProductType as ProductTypePrisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ProductType implements ProductTypePrisma {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;
}
