import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';

@Injectable()
export class ZoneService {
  constructor(private prisma: PrismaService) {}

  create(createZoneDto: CreateZoneDto) {
    return this.prisma.zone.create({ data: createZoneDto });
  }

  findAll(cardinalPointId?: number) {
    return this.prisma.zone.findMany({
      where: {
        ...(!!cardinalPointId && { cardinalPointId }),
      },
    });
  }

  findOne(id: number) {
    return this.prisma.zone.findUnique({ where: { id } });
  }

  update(id: number, updateZoneDto: UpdateZoneDto) {
    return this.prisma.zone.update({
      where: { id },
      data: updateZoneDto,
    });
  }

  remove(id: number) {
    return this.prisma.zone.delete({ where: { id } });
  }
}
