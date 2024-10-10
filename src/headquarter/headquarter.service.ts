import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateHeadquarterDto } from './dto/create-headquarter.dto';
import { UpdateHeadquarterDto } from './dto/update-headquarter.dto';

@Injectable()
export class HeadquarterService {
  constructor(private prisma: PrismaService) {}

  create(createHeadquarterDto: CreateHeadquarterDto) {
    return this.prisma.headquarter.create({
      data: {
        name: createHeadquarterDto.name,
        address: createHeadquarterDto.address,
        image: createHeadquarterDto.image,
        menuUrl: createHeadquarterDto?.menuUrl || '',
        openingHours: {
          create: createHeadquarterDto.openingHours?.map((openingHour) => ({
            label: openingHour.label,
            range: openingHour.range,
          })),
        },
        customer: {
          connect: { id: createHeadquarterDto.customerId },
        },
        zone: {
          connect: { id: createHeadquarterDto.zoneId },
        },
        categories: {
          connect: createHeadquarterDto.categories.map((id) => ({ id })),
        },
        amenities: {
          connect: createHeadquarterDto.amenities.map((id) => ({ id })),
        },
      },
    });
  }

  findAll() {
    return this.prisma.headquarter.findMany({
      include: {
        categories: true,
        customer: {
          include: {
            tag: true,
          },
        },
        openingHours: true,
        zone: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.headquarter.findUnique({
      where: { id },
      include: {
        categories: true,
        amenities: true,
        customer: {
          include: {
            tag: true,
            serviceBudgets: {
              include: {
                serviceType: true,
              },
            },
            headquarters: true,
            paymentMethods: true,
          },
        },
        openingHours: true,
        zone: {
          include: {
            cardinalPoint: {
              include: {
                cities: true,
              },
            },
          },
        },
      },
    });
  }

  update(id: number, updateHeadquarterDto: UpdateHeadquarterDto) {
    return this.prisma.headquarter.update({
      where: { id },
      data: {
        name: updateHeadquarterDto.name,
        address: updateHeadquarterDto.address,
        image: updateHeadquarterDto.image,
        menuUrl: updateHeadquarterDto?.menuUrl || '',
        openingHours: {
          deleteMany: {},
          create: updateHeadquarterDto.openingHours?.map((openingHour) => ({
            label: openingHour.label,
            range: openingHour.range,
          })),
        },
        customer: {
          connect: { id: updateHeadquarterDto.customerId },
        },
        zone: {
          connect: { id: updateHeadquarterDto.zoneId },
        },
        categories: {
          set: updateHeadquarterDto.categories.map((id) => ({ id })),
        },
      },
    });
  }

  remove(id: number) {
    return this.prisma.headquarter.delete({ where: { id } });
  }
}
