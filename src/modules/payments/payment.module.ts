import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PaymentService } from './payment.services';
import { PaymentResolver } from './payment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_Payment } from 'src/graphql/models/user_payments';
import { OptionModule } from '../options/option.module';
import { User_Payment_Option } from 'src/graphql/models/user_payment_options';

@Module({
  imports: [
    TypeOrmModule.forFeature([User_Payment, User_Payment_Option]),
    OptionModule,
  ],
  providers: [PaymentResolver, PaymentService, JwtService],
})
export class PaymentModule {}
