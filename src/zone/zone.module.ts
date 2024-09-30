import { Module } from '@nestjs/common';
import { PrismaModule } from '@src/prisma/prisma.module';
import { ZoneService } from './zone.service';
import { ZoneController } from './zone.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ZoneController],
  providers: [ZoneService],
})
export class ZoneModule {}
