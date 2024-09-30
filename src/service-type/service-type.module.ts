import { Module } from '@nestjs/common';
import { PrismaModule } from '@src/prisma/prisma.module';
import { ServiceTypeService } from './service-type.service';
import { ServiceTypeController } from './service-type.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ServiceTypeController],
  providers: [ServiceTypeService],
})
export class ServiceTypeModule {}
