import { Module } from '@nestjs/common';
import { VatRateService } from './vat-rate.service';
import { VatRateController } from './vat-rate.controller';
import { VatRate, VatRateSchema } from './schema/vat-rate.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VatRate.name, schema: VatRateSchema }]),
  ],
  controllers: [VatRateController],
  providers: [VatRateService],
})
export class VatRateModule { }
