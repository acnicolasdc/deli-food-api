import { ServiceType as ServiceTypePrisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ServiceType implements ServiceTypePrisma {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;
}
