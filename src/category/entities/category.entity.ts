import { Category as CategoryPrisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Category implements CategoryPrisma {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;
}
