import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserProfile } from './schema/user-profile.schema';
import { Bank } from 'src/bank/schema/bank.schema';
import { CreateUserProfileDto, UpdateUserProfileDto } from './dto/create-user-profile.dto';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectModel(UserProfile.name)
    private readonly userProfileModel: Model<UserProfile>,
    @InjectModel(Bank.name)
    private readonly bankModel: Model<Bank>,
  ) {}

  async validateBankIds(bankIds: string[]): Promise<void> {
    const validBanks = await this.bankModel.find({ _id: { $in: bankIds } }).exec();
    if (validBanks.length !== bankIds.length) {
      throw new NotFoundException('One or more Bank IDs are invalid.');
    }
  }

  async create(createUserProfileDto: CreateUserProfileDto): Promise<UserProfile> {
    // Validate bank IDs
    await this.validateBankIds(createUserProfileDto.banks);

    const createdUserProfile = new this.userProfileModel(createUserProfileDto);
    return createdUserProfile.save();
  }

  async findAll(): Promise<UserProfile[]> {
    return this.userProfileModel.find().populate('banks').exec();
  }

  async findOne(id: string): Promise<UserProfile> {
    const userProfile = await this.userProfileModel.findById(id).populate('banks').exec();
    if (!userProfile) throw new NotFoundException('UserProfile not found');
    return userProfile;
  }

  async update(id: string, updateUserProfileDto: UpdateUserProfileDto): Promise<UserProfile> {
    // Validate bank IDs if provided
    if (updateUserProfileDto.banks) {
      await this.validateBankIds(updateUserProfileDto.banks);
    }

    const updatedUserProfile = await this.userProfileModel
      .findByIdAndUpdate(id, updateUserProfileDto, { new: true })
      .exec();
    if (!updatedUserProfile) throw new NotFoundException('UserProfile not found');
    return updatedUserProfile;
  }

  async delete(id: string): Promise<void> {
    await this.userProfileModel.findByIdAndDelete(id).exec();
  }
}