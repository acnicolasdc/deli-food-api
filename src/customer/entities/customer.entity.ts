import { Customer as CustomerPrisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Customer implements CustomerPrisma {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  logo: string;

  @ApiProperty()
  waitingTime: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  tagId: number;

  @ApiProperty()
  updatedAt: Date;
}
