import { Module } from '@nestjs/common';
import { PrismaModule } from '@src/prisma/prisma.module';
import { SupabaseService } from '@src/supabase/supabase.service';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CustomerController],
  providers: [SupabaseService, CustomerService],
})
export class CustomerModule {}
