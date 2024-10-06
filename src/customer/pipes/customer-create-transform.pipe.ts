import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class TransformAndValidatePipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const transformedValue = { ...value };

    if (typeof transformedValue.amenities === 'string') {
      transformedValue.amenities = JSON.parse(transformedValue.amenities);
    }
    if (typeof transformedValue.paymentMethods === 'string') {
      transformedValue.paymentMethods = JSON.parse(
        transformedValue.paymentMethods,
      );
    }
    if (typeof transformedValue.productTypes === 'string') {
      transformedValue.productTypes = JSON.parse(transformedValue.productTypes);
    }
    if (typeof transformedValue.serviceBudgets === 'string') {
      transformedValue.serviceBudgets = JSON.parse(
        transformedValue.serviceBudgets,
      );
    }
    if (typeof transformedValue.headquarters === 'string') {
      transformedValue.headquarters = JSON.parse(transformedValue.headquarters);
    }

    const dto = plainToClass(metadata.metatype, transformedValue);

    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed!');
    }

    return dto;
  }
}
