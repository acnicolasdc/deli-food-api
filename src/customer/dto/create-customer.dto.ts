import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateCustomerHeadquarterDto } from './create-customer-headquarter.dto';
import { CreateCustomerServiceBudgetDto } from './create-customer-service-budget.dto';
import { Type } from 'class-transformer';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Name of the customer',
    example: 'John Doe Company',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: 'string' })
  logo?: string;

  @ApiProperty({
    description: 'Estimated waiting time for the customer',
    example: '15-20 mins',
  })
  @IsString()
  @IsNotEmpty()
  waitingTime: string;

  @ApiProperty({
    description: 'List of payment methods (IDs)',
    example: [1, 2],
  })
  @IsArray()
  @IsOptional()
  @IsInt({ each: true })
  paymentMethods: number[];

  @ApiProperty({ description: 'List of product types (IDs)', example: [1, 2] })
  @IsArray()
  @IsOptional()
  @IsInt({ each: true })
  productTypes: number[];

  @ApiProperty({ description: 'Id of Tags', example: 1 })
  @IsOptional()
  @IsInt()
  tagId: number;

  @ApiProperty({
    description: 'Array of service budgets with their count and service type',
    type: [CreateCustomerServiceBudgetDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCustomerServiceBudgetDto)
  serviceBudgets: CreateCustomerServiceBudgetDto[];

  @ApiProperty({
    description:
      'Array of headquarters with name, address, image, categories, zone, and opening hours',
    type: [CreateCustomerHeadquarterDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCustomerHeadquarterDto)
  headquarters: CreateCustomerHeadquarterDto[];
}
