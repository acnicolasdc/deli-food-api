import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { AmenityModule } from './amenity/amenity.module';
import { CityModule } from './city/city.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { ProductTypeModule } from './product-type/product-type.module';
import { ServiceTypeModule } from './service-type/service-type.module';
import { TagModule } from './tag/tag.module';
import { ZoneModule } from './zone/zone.module';
import { CardinalPointModule } from './cardinal-point/cardinal-point.module';
import { CustomerModule } from './customer/customer.module';
import { HeadquarterModule } from './headquarter/headquarter.module';

@Module({
  imports: [
    PrismaModule,
    CategoryModule,
    AmenityModule,
    CityModule,
    PaymentMethodModule,
    ProductTypeModule,
    ServiceTypeModule,
    TagModule,
    ZoneModule,
    CardinalPointModule,
    CustomerModule,
    HeadquarterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
