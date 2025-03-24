import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { PaymentMethodService } from './payment-method.service';
import { CreatePaymentMethodDto, UpdatePaymentMethodDto } from '../dto/payment-method.dto';

@ApiTags('Payment Methods')
@Controller('payment-methods')
export class PaymentMethodController {
    constructor(private readonly paymentMethodService: PaymentMethodService) { }

    @Post()
    @ApiOperation({ summary: 'Create a payment method' })
    @ApiResponse({ status: 201, description: 'Payment method created successfully.' })
    @ApiBody({ type: CreatePaymentMethodDto })
    async create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
        return this.paymentMethodService.create(createPaymentMethodDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all payment methods' })
    @ApiResponse({ status: 200, description: 'List of all payment methods.' })
    async findAll() {
        return this.paymentMethodService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a payment method by ID' })
    @ApiParam({ name: 'id', description: 'Payment method ID', example: '507f1f77bcf86cd799439011' })
    @ApiResponse({ status: 200, description: 'Payment method found.' })
    async findOne(@Param('id') id: string) {
        return this.paymentMethodService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a payment method by ID' })
    @ApiParam({ name: 'id', description: 'Payment method ID', example: '507f1f77bcf86cd799439011' })
    @ApiResponse({ status: 200, description: 'Payment method updated successfully.' })
    @ApiBody({ type: UpdatePaymentMethodDto })
    async update(@Param('id') id: string, @Body() updatePaymentMethodDto: UpdatePaymentMethodDto) {
        return this.paymentMethodService.update(id, updatePaymentMethodDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a payment method by ID' })
    @ApiParam({ name: 'id', description: 'Payment method ID', example: '507f1f77bcf86cd799439011' })
    @ApiResponse({ status: 200, description: 'Payment method deleted successfully.' })
    async delete(@Param('id') id: string) {
        return this.paymentMethodService.delete(id);
    }
}