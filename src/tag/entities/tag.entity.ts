import { Tag as TagPrisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Tag implements TagPrisma {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;
}
