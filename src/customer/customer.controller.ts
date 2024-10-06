import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiBody,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { SupabaseService } from '@src/supabase/supabase.service';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer as CustomerEntity } from './entities/customer.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ParseFormData } from './decorator/parse-form-data.decorator';

@Controller('customer')
@ApiTags('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly supabaseService: SupabaseService,
  ) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'logo', maxCount: 1 },
      { name: 'headquartersImages', maxCount: 10 },
    ]),
  )
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateCustomerDto })
  @ApiCreatedResponse({ type: CustomerEntity })
  async create(
    @ParseFormData(new ValidationPipe()) createCustomerDto: CreateCustomerDto,
    @UploadedFiles()
    files: {
      logo: Express.Multer.File[];
      headquartersImages: Express.Multer.File[];
    },
  ) {
    const { logo, headquartersImages } = files;
    const imageUrl = await this.supabaseService.uploadImage(
      logo[0],
      'customer',
    );
    const headquartersData = await Promise.all(
      createCustomerDto.headquarters.map(async (headquarter, index) => ({
        ...headquarter,
        image: await this.supabaseService.uploadImage(
          headquartersImages[index],
          'headquarter',
        ),
      })),
    );
    return this.customerService.create({
      ...createCustomerDto,
      logo: imageUrl,
      headquarters: headquartersData,
    });
  }

  @Get()
  @ApiOkResponse({ type: CustomerEntity, isArray: true })
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: CustomerEntity })
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: CustomerEntity })
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: CustomerEntity })
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
