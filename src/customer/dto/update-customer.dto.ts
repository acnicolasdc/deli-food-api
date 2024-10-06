import { PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  headquarters: {
    id: number;
    name: string;
    image: string;
    address: string;
    categories: number[];
    openingHours: {
      id: number;
      label: string;
      range: string;
    }[];
    zoneId: number;
  }[];
  serviceBudgets: {
    id: number;
    count: number;
    serviceTypeId: number;
  }[];
}
