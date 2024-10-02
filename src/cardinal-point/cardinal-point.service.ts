import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateCardinalPointDto } from './dto/create-cardinal-point.dto';
import { UpdateCardinalPointDto } from './dto/update-cardinal-point.dto';

@Injectable()
export class CardinalPointService {
  constructor(private prisma: PrismaService) {}

  create(createCardinalPointDto: CreateCardinalPointDto) {
    const { cityIds, ...restValues } = createCardinalPointDto;
    return this.prisma.cardinalPoint.create({
      data: {
        ...restValues,
        ...(!!cityIds.length && {
          cities: {
            connect: cityIds.map((id) => ({ id })),
          },
        }),
      },
    });
  }
  findAll(cityId?: number) {
    return this.prisma.cardinalPoint.findMany({
      where: {
        ...(!!cityId && {
          cities: {
            some: { id: cityId },
          },
        }),
      },
    });
  }

  findOne(id: number) {
    return this.prisma.cardinalPoint.findUnique({ where: { id } });
  }

  update(id: number, updateCardinalPointDto: UpdateCardinalPointDto) {
    const { cityIds, ...restValues } = updateCardinalPointDto;
    return this.prisma.cardinalPoint.update({
      where: { id },
      data: {
        ...restValues,
        ...(!!cityIds.length && {
          cities: {
            connect: cityIds.map((id) => ({ id })),
          },
        }),
      },
    });
  }

  remove(id: number) {
    return this.prisma.cardinalPoint.delete({ where: { id } });
  }
}
