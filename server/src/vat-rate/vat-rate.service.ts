import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VatRate } from './schema/vat-rate.schema';
import { CreateVatRateDto } from './dto/create-vat-rate.dto';
import { UpdateVatRateDto } from './dto/update-vat-rate.dto';

@Injectable()
export class VatRateService {
  constructor(
    @InjectModel(VatRate.name)
    private readonly vatRateModel: Model<VatRate>,
  ) {}

  async create(createVatRateDto: CreateVatRateDto): Promise<VatRate> {
    const createdVatRate = new this.vatRateModel(createVatRateDto);
    return createdVatRate.save();
  }

  async findAll(): Promise<VatRate[]> {
    return this.vatRateModel.find().exec();
  }

  async findOne(id: string): Promise<VatRate> {
    return this.vatRateModel.findById(id).exec();
  }

  async update(id: string, updateVatRateDto: UpdateVatRateDto): Promise<VatRate> {
    return this.vatRateModel.findByIdAndUpdate(id, updateVatRateDto, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.vatRateModel.findByIdAndDelete(id).exec();
  }
}