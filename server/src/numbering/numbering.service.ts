import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Numbering } from './schema/numbering.schema';
import { CreateNumberingDto, UpdateNumberingDto } from './dto/create-numbering.dto';

@Injectable()
export class NumberingService {
  constructor(
    @InjectModel(Numbering.name)
    private readonly numberingModel: Model<Numbering>,
  ) {}

  async create(createNumberingDto: CreateNumberingDto): Promise<Numbering> {
    const createdNumbering = new this.numberingModel(createNumberingDto);
    return createdNumbering.save();
  }

  async findAll(): Promise<Numbering[]> {
    return this.numberingModel.find().exec();
  }

  async findOne(id: string): Promise<Numbering> {
    return this.numberingModel.findById(id).exec();
  }

  async update(id: string, updateNumberingDto: UpdateNumberingDto): Promise<Numbering> {
    return this.numberingModel.findByIdAndUpdate(id, updateNumberingDto, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.numberingModel.findByIdAndDelete(id).exec();
  }
}