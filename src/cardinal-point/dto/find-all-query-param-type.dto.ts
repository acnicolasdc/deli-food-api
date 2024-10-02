import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class FindAllQueryParamDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => {
    const parsedValue = parseInt(value, 10);
    return isNaN(parsedValue) ? undefined : parsedValue;
  })
  cityId?: number;
}
