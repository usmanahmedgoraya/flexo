import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserProfile } from 'src/user-profile/schema/user-profile.schema';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { Bank } from './schema/bank.schema';

@Injectable()
export class BankService {
  constructor(
    @InjectModel(Bank.name) private readonly bankModel: Model<Bank>,
  ) {}

  async create(createBankDto: CreateBankDto): Promise<Bank> {
    const createdBank = new this.bankModel(createBankDto);
    return createdBank.save();
  }

  async findAll(): Promise<Bank[]> {
    return this.bankModel.find().exec();
  }

  async findOne(id: string): Promise<Bank> {
    return this.bankModel.findById(id).exec();
  }

  async update(id: string, updateBankDto: UpdateBankDto): Promise<Bank> {
    return this.bankModel.findByIdAndUpdate(id, updateBankDto, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.bankModel.findByIdAndDelete(id).exec();
  }
}