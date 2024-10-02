import { Module } from '@nestjs/common';
import { PrismaModule } from '@src/prisma/prisma.module';
import { CardinalPointService } from './cardinal-point.service';
import { CardinalPointController } from './cardinal-point.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CardinalPointController],
  providers: [CardinalPointService],
})
export class CardinalPointModule {}
