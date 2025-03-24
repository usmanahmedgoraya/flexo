import { IsString, IsOptional, IsAlphanumeric } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBankDto {
  @ApiProperty({
    description: 'The name of the bank',
    example: 'Updated Bank Name',
    required: false,
  })
  @IsString()
  @IsOptional()
  bankName?: string;

  @ApiProperty({
    description: 'The unique number of the bank',
    example: '654321',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsAlphanumeric()
  bankNumber?: string;
}