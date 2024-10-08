import { Module } from '@nestjs/common';
import { HeadquarterService } from './headquarter.service';
import { HeadquarterController } from './headquarter.controller';
import { PrismaModule } from '@src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HeadquarterController],
  providers: [HeadquarterService],
})
export class HeadquarterModule {}
