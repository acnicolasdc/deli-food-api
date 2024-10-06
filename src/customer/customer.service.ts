import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  create(createCustomerDto: CreateCustomerDto) {
    const {
      amenities,
      headquarters,
      serviceBudgets,
      productTypes,
      paymentMethods,
      logo,
      ...restValues
    } = createCustomerDto;
    return this.prisma.customer.create({
      data: {
        ...restValues,
        ...(logo && { logo }),
        ...(!!amenities.length && {
          amenities: {
            connect: amenities.map((id) => ({ id })),
          },
        }),
        ...(!!paymentMethods.length && {
          paymentMethods: {
            connect: paymentMethods.map((id) => ({ id })),
          },
        }),
        ...(!!productTypes.length && {
          productTypes: {
            connect: productTypes.map((id) => ({ id })),
          },
        }),
        serviceBudgets: {
          create: serviceBudgets?.map((budget) => ({
            count: budget.count,
            serviceType: {
              connect: { id: budget.serviceTypeId },
            },
          })),
        },
        headquarters: {
          create: headquarters?.map((headquarter) => ({
            name: headquarter.name,
            address: headquarter.address,
            image: headquarter.image,
            openingHours: {
              create: headquarter.openingHours?.map((openingHour) => ({
                label: openingHour.label,
                range: openingHour.range,
              })),
            },
            zone: {
              connect: { id: headquarter.zoneId },
            },
            categories: {
              connect: headquarter.categories.map((id) => ({ id })),
            },
          })),
        },
      },
    });
  }

  findAll() {
    return this.prisma.customer.findMany();
  }

  findOne(id: number) {
    return this.prisma.customer.findUnique({ where: { id } });
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const {
      amenities,
      headquarters,
      serviceBudgets,
      productTypes,
      paymentMethods,
      ...restValues
    } = updateCustomerDto;
    return this.prisma.customer.update({
      where: { id: id }, // Specify the customer to update
      data: {
        ...restValues,
        ...(amenities &&
          amenities.length > 0 && {
            amenities: {
              set: amenities.map((id) => ({ id })), // 'set' will replace existing amenities
            },
          }),
        ...(paymentMethods &&
          paymentMethods.length > 0 && {
            paymentMethods: {
              set: paymentMethods.map((id) => ({ id })), // 'set' to update payment methods
            },
          }),
        ...(productTypes &&
          productTypes.length > 0 && {
            productTypes: {
              set: productTypes.map((id) => ({ id })), // 'set' for product types
            },
          }),
        ...(serviceBudgets &&
          serviceBudgets.length > 0 && {
            serviceBudgets: {
              upsert: serviceBudgets.map((budget) => ({
                where: { serviceTypeId: budget.serviceTypeId }, // Match the existing budget by serviceTypeId
                update: { count: budget.count },
                create: {
                  count: budget.count,
                  serviceType: {
                    connect: { id: budget.serviceTypeId },
                  },
                },
              })),
            },
          }),
        ...(headquarters &&
          headquarters.length > 0 && {
            headquarters: {
              upsert: headquarters.map((headquarter) => ({
                where: { id: headquarter.id },
                update: {
                  name: headquarter.name,
                  address: headquarter.address,
                  image: headquarter.image,
                  openingHours: {
                    upsert: headquarter.openingHours?.map((openingHour) => ({
                      where: { id: openingHour.id },
                      update: {
                        label: openingHour.label,
                        range: openingHour.range,
                      },
                      create: {
                        label: openingHour.label,
                        range: openingHour.range,
                      },
                    })),
                  },
                  zone: {
                    connect: { id: headquarter.zoneId },
                  },
                  categories: {
                    set: headquarter.categories.map((id) => ({ id })),
                  },
                },
                create: {
                  name: headquarter.name,
                  address: headquarter.address,
                  image: headquarter.image,
                  openingHours: {
                    create: headquarter.openingHours?.map((openingHour) => ({
                      label: openingHour.label,
                      range: openingHour.range,
                    })),
                  },
                  zone: {
                    connect: { id: headquarter.zoneId },
                  },
                  categories: {
                    connect: headquarter.categories.map((id) => ({ id })),
                  },
                },
              })),
            },
          }),
      },
    });
  }

  async remove(id: number) {
    // Check if the customer exists
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      throw new Error(`Customer with id ${id} not found`);
    }
    await this.prisma.$transaction([
      // Delete related OpeningHours for each Headquarter
      this.prisma.openingHour.deleteMany({
        where: {
          headquarter: {
            customerId: id,
          },
        },
      }),

      // Delete related Headquarters
      this.prisma.headquarter.deleteMany({
        where: { customerId: id },
      }),

      // Delete related Reviews
      this.prisma.review.deleteMany({
        where: { customerId: id },
      }),

      // Delete related Promotions
      this.prisma.promotion.deleteMany({
        where: { customerId: id },
      }),

      // Delete related Service Budgets
      this.prisma.serviceBudget.deleteMany({
        where: {
          customers: {
            some: {
              id,
            },
          },
        },
      }),

      // Finally, delete the Customer
      this.prisma.customer.delete({
        where: { id },
      }),
    ]);

    return {
      message: `Customer with id ${id} and all related records have been deleted.`,
    };
  }
}
