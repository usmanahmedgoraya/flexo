import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { PaymentMethod } from './payment-method.schema';
import { VatRate } from 'src/vat-rate/schema/vat-rate.schema';

@Schema()
export class FinancialParameters extends Document {
    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'VatRate' }])
    vatRates: VatRate[];

    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'PaymentMethod' }])
    paymentMethods: PaymentMethod[];

    @Prop({ default: false })
    allowSaleOnCredit: boolean;

    @Prop({ default: '€' })
    currencySymbol: string;

    @Prop({ default: false })
    enableFidelity: boolean;

    @Prop({ default: 0 })
    fidelityBonus: number;

    @Prop({ default: 0 })
    fidelityTotalPurchaseRequired: number;

    @Prop({ default: false })
    enableDailyGoal: boolean;

    @Prop({ default: 0 })
    dailyTurnoverGoal: number;
}

export const FinancialParametersSchema = SchemaFactory.createForClass(FinancialParameters);