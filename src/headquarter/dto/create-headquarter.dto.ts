import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateHeadquarterOpeningHourDto {
  @ApiProperty({
    description: 'Label for the opening hours',
    example: 'Weekdays',
  })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty({
    description: 'Range of opening hours',
    example: '9:00 AM - 5:00 PM',
  })
  @IsString()
  @IsNotEmpty()
  range: string;
}

export class CreateHeadquarterDto {
  @ApiProperty({ description: 'Customer ID for the headquarter', example: 1 })
  @IsInt()
  customerId: number;

  @ApiProperty({
    description: 'Name of the headquarter',
    example: 'Main Office',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: 'string' })
  image?: string;

  @ApiProperty({
    description: 'Address of the headquarter',
    example: '123 Main Street',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Zone ID for the headquarter', example: 1 })
  @IsInt()
  zoneId: number;

  @ApiProperty({
    description: 'List of category IDs for the headquarter',
    example: [1, 2, 3],
  })
  @IsArray()
  @IsInt({ each: true })
  categories: number[];

  @ApiProperty({
    description: 'Opening hours for the headquarter',
    type: [CreateHeadquarterOpeningHourDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateHeadquarterOpeningHourDto)
  openingHours: CreateHeadquarterOpeningHourDto[];

  @ApiProperty({ description: 'List of amenities (IDs)', example: [1, 2, 3] })
  @IsArray()
  @IsOptional()
  @IsInt({ each: true })
  amenities: number[];
}
