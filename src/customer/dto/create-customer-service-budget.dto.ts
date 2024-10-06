import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerServiceBudgetDto {
  @ApiProperty({ description: 'Count for the service budget', example: 100 })
  @IsInt()
  @IsNotEmpty()
  count: number;

  @ApiProperty({ description: 'Service type ID', example: 1 })
  @IsInt()
  @IsNotEmpty()
  serviceTypeId: number;
}
