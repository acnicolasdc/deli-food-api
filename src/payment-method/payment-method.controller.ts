import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { PaymentMethodService } from './payment-method.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { PaymentMethod as PaymentMethodEntity } from './entities/payment-method.entity';

@Controller('payment-method')
@ApiTags('payment-method')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Post()
  @ApiCreatedResponse({ type: PaymentMethodEntity })
  create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.paymentMethodService.create(createPaymentMethodDto);
  }

  @Get()
  @ApiOkResponse({ type: PaymentMethodEntity, isArray: true })
  findAll() {
    return this.paymentMethodService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PaymentMethodEntity })
  findOne(@Param('id') id: string) {
    return this.paymentMethodService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: PaymentMethodEntity })
  update(
    @Param('id') id: string,
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDto,
  ) {
    return this.paymentMethodService.update(+id, updatePaymentMethodDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: PaymentMethodEntity })
  remove(@Param('id') id: string) {
    return this.paymentMethodService.remove(+id);
  }
}
