import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePaymentMethodDto, UpdatePaymentMethodDto } from '../dto/payment-method.dto';
import { PaymentMethod } from '../schema/payment-method.schema';

@Injectable()
export class PaymentMethodService {
    constructor(
        @InjectModel(PaymentMethod.name)
        private readonly paymentMethodModel: Model<PaymentMethod>,
    ) { }

    async create(createPaymentMethodDto: CreatePaymentMethodDto): Promise<PaymentMethod> {
        const createdPaymentMethod = new this.paymentMethodModel(createPaymentMethodDto);
        return createdPaymentMethod.save();
    }

    async findAll(): Promise<PaymentMethod[]> {
        return this.paymentMethodModel.find().exec();
    }

    async findOne(id: string): Promise<PaymentMethod> {
        return this.paymentMethodModel.findById(id).exec();
    }

    async update(id: string, updatePaymentMethodDto: UpdatePaymentMethodDto): Promise<PaymentMethod> {
        return this.paymentMethodModel.findByIdAndUpdate(id, updatePaymentMethodDto, { new: true }).exec();
    }

    async delete(id: string): Promise<void> {
        await this.paymentMethodModel.findByIdAndDelete(id).exec();
    }
}