import { PrismaClient } from '@prisma/client';

import tags from './seeds/tags.json';
import zones from './seeds/zones.json';
import cardinalPoints from './seeds/cardinalPoint.json';
import amenities from './seeds/amenities.json';
import paymentMethods from './seeds/paymentMethods.json';
import cities from './seeds/cities.json';
import categories from './seeds/categories.json';
import productTypes from './seeds/productTypes.json';
import serviceTypes from './seeds/serviceType.json';

async function upsertTags(dataArray: typeof tags) {
  for (const data of dataArray) {
    try {
      await prisma.tag.upsert({
        where: { id: data.id },
        update: data,
        create: data,
      });
      console.log('Tag fields seed data inserted successfully');
    } catch (error) {
      console.error('Error upserting field:', data.id, error);
    }
  }
}
async function upsertAmenities(dataArray: typeof amenities) {
  for (const data of dataArray) {
    try {
      await prisma.amenity.upsert({
        where: { id: data.id },
        update: data,
        create: data,
      });
      console.log('Amenity fields seed data inserted successfully');
    } catch (error) {
      console.error('Error upserting field:', data.id, error);
    }
  }
}
async function upsertPaymentMethods(dataArray: typeof paymentMethods) {
  for (const data of dataArray) {
    try {
      await prisma.paymentMethod.upsert({
        where: { id: data.id },
        update: data,
        create: data,
      });
      console.log('Payment Methods fields seed data inserted successfully');
    } catch (error) {
      console.error('Error upserting field:', data.id, error);
    }
  }
}

async function upsertCategories(dataArray: typeof categories) {
  for (const data of dataArray) {
    try {
      await prisma.category.upsert({
        where: { id: data.id },
        update: data,
        create: data,
      });
      console.log('Category fields seed data inserted successfully');
    } catch (error) {
      console.error('Error upserting field:', data.id, error);
    }
  }
}

async function upsertCities(dataArray: typeof cities) {
  for (const data of dataArray) {
    try {
      await prisma.city.upsert({
        where: { id: data.id },
        update: data,
        create: data,
      });
      console.log('Cities fields seed data inserted successfully');
    } catch (error) {
      console.error('Error upserting field:', data.id, error);
    }
  }
}

async function upsertZones(dataArray: typeof zones) {
  for (const data of dataArray) {
    try {
      await prisma.zone.upsert({
        where: { id: data.id },
        update: data,
        create: { ...data },
      });
      console.log('Zone fields seed data inserted successfully');
    } catch (error) {
      console.error('Error upserting field:', data.id, error);
    }
  }
}

async function upsertCardinalPoint(
  dataArray: typeof cardinalPoints,
  cityId: number,
) {
  for (const data of dataArray) {
    try {
      await prisma.cardinalPoint.upsert({
        where: { id: data.id },
        update: data,
        create: {
          ...data,
          cities: {
            connect: {
              id: cityId,
            },
          },
        },
      });
      console.log('Zone fields seed data inserted successfully');
    } catch (error) {
      console.error('Error upserting field:', data.id, error);
    }
  }
}
async function upsertProductType(dataArray: typeof productTypes) {
  for (const data of dataArray) {
    try {
      await prisma.productType.upsert({
        where: { id: data.id },
        update: data,
        create: data,
      });
      console.log('Product Type fields seed data inserted successfully');
    } catch (error) {
      console.error('Error upserting field:', data.id, error);
    }
  }
}

async function upsertServiceType(dataArray: typeof serviceTypes) {
  for (const data of dataArray) {
    try {
      await prisma.serviceType.upsert({
        where: { id: data.id },
        update: data,
        create: data,
      });
      console.log('Service Types Type fields seed data inserted successfully');
    } catch (error) {
      console.error('Error upserting field:', data.id, error);
    }
  }
}

const prisma = new PrismaClient();
async function main() {
  await upsertCategories(categories);
  await upsertCities(cities);
  await upsertCardinalPoint(cardinalPoints, cities[0].id);
  await upsertZones(zones);
  await upsertProductType(productTypes);
  await upsertServiceType(serviceTypes);
  await upsertTags(tags);
  await upsertAmenities(amenities);
  await upsertPaymentMethods(paymentMethods);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
