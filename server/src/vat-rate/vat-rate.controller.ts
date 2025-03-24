import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { VatRateService } from './vat-rate.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateVatRateDto } from './dto/create-vat-rate.dto';
import { UpdateVatRateDto } from './dto/update-vat-rate.dto';

@ApiTags('VAT Rates')
@Controller('vat-rates')
export class VatRateController {
  constructor(private readonly vatRateService: VatRateService) {}

  @Post()
  @ApiOperation({ summary: 'Create a VAT rate' })
  @ApiResponse({ status: 201, description: 'VAT rate created successfully.' })
  async create(@Body() createVatRateDto: CreateVatRateDto) {
    return this.vatRateService.create(createVatRateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all VAT rates' })
  @ApiResponse({ status: 200, description: 'List of all VAT rates.' })
  async findAll() {
    return this.vatRateService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a VAT rate by ID' })
  @ApiParam({ name: 'id', description: 'VAT rate ID', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'VAT rate found.' })
  async findOne(@Param('id') id: string) {
    return this.vatRateService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a VAT rate by ID' })
  @ApiParam({ name: 'id', description: 'VAT rate ID', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'VAT rate updated successfully.' })
  async update(@Param('id') id: string, @Body() updateVatRateDto: UpdateVatRateDto) {
    return this.vatRateService.update(id, updateVatRateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a VAT rate by ID' })
  @ApiParam({ name: 'id', description: 'VAT rate ID', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'VAT rate deleted successfully.' })
  async delete(@Param('id') id: string) {
    return this.vatRateService.delete(id);
  }
}