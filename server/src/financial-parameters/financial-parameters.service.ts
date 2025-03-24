import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFinancialParametersDto, UpdateFinancialParametersDto } from './dto/create-financial-parameter.dto';
import { FinancialParameters } from './schema/financial-parameter.schema';
import { VatRate } from '../vat-rate/schema/vat-rate.schema';
import { PaymentMethod } from './schema/payment-method.schema';

@Injectable()
export class FinancialParametersService {
  constructor(
    @InjectModel(FinancialParameters.name)
    private readonly financialParametersModel: Model<FinancialParameters>,
    @InjectModel(VatRate.name)
    private readonly vatRateModel: Model<VatRate>,
    @InjectModel(PaymentMethod.name)
    private readonly paymentMethodModel: Model<PaymentMethod>,
  ) {}

  async validateIds(vatRateIds: string[], paymentMethodIds: string[]): Promise<void> {
    // Validate VAT Rate IDs
    const validVatRates = await this.vatRateModel.find({ _id: { $in: vatRateIds } }).exec();
    if (validVatRates.length !== vatRateIds.length) {
      throw new NotFoundException('One or more VAT Rate IDs are invalid.');
    }

    // Validate Payment Method IDs
    const validPaymentMethods = await this.paymentMethodModel.find({ _id: { $in: paymentMethodIds } }).exec();
    if (validPaymentMethods.length !== paymentMethodIds.length) {
      throw new NotFoundException('One or more Payment Method IDs are invalid.');
    }
  }

  async create(createFinancialParametersDto: CreateFinancialParametersDto): Promise<FinancialParameters> {
    const { vatRates, paymentMethods } = createFinancialParametersDto;

    // Validate IDs before creating the document
    await this.validateIds(vatRates, paymentMethods);

    const createdFinancialParameters = new this.financialParametersModel(createFinancialParametersDto);
    return createdFinancialParameters.save();
  }

  async findAll(): Promise<FinancialParameters[]> {
    return this.financialParametersModel.find().populate('vatRates').populate('paymentMethods').exec();
  }

  async findOne(id: string): Promise<FinancialParameters> {
    const financialParameters = await this.financialParametersModel.findById(id).populate('vatRates').populate('paymentMethods').exec();
    if (!financialParameters) {
      throw new NotFoundException('Financial parameters not found.');
    }
    return financialParameters;
  }

  async update(id: string, updateFinancialParametersDto: UpdateFinancialParametersDto): Promise<FinancialParameters> {
    const { vatRates, paymentMethods } = updateFinancialParametersDto;

    // Validate IDs before updating the document
    if (vatRates || paymentMethods) {
      await this.validateIds(vatRates || [], paymentMethods || []);
    }

    const updatedFinancialParameters = await this.financialParametersModel
      .findByIdAndUpdate(id, updateFinancialParametersDto, { new: true })
      .exec();

    if (!updatedFinancialParameters) {
      throw new NotFoundException('Financial parameters not found.');
    }
    return updatedFinancialParameters;
  }

  async delete(id: string): Promise<void> {
    const deletedFinancialParameters = await this.financialParametersModel.findByIdAndDelete(id).exec();
    if (!deletedFinancialParameters) {
      throw new NotFoundException('Financial parameters not found.');
    }
  }
}