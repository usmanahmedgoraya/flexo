import { IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVatRateDto {
  @ApiProperty({ example: 'VAT1', description: 'Unique VAT code' })
  @IsString()
  code: string;

  @ApiProperty({ example: 12, description: 'VAT percentage' })
  @IsNumber()
  rate: number;

  @ApiProperty({ example: true, description: 'Enable/disable VAT rate' })
  @IsBoolean()
  isActive: boolean;
}

