import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BankModule } from './bank/bank.module';
import { FinancialParametersModule } from './financial-parameters/financial-parameters.module';
import { VatRateModule } from './vat-rate/vat-rate.module';
import { UsersModule } from './user-profile/users-profile.module';
import { NumberingModule } from './numbering/numbering.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true
  }), MongooseModule.forRoot(process.env.MONGO_URI),AuthModule,UsersModule, BankModule, FinancialParametersModule, VatRateModule, NumberingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
