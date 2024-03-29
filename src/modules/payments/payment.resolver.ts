import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import {
  CreatePaymentInput,
  CreateUserPaymentInput,
  CreateUserPaymentOptionInput,
} from './paymentDto/createPaymentInput';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/middleware/auth.guard';
import { AuthorizationGuard } from 'src/middleware/auth.middleware';
import { PaymentService } from './payment.services';
import { User_Payment } from 'src/graphql/models/user_payments';
import { User_Payment_Option } from 'src/graphql/models/user_payment_options';

@Resolver()
export class PaymentResolver {
  constructor(private paymentService: PaymentService) {}

  @Mutation(() => String)
  @UseGuards(AuthorizationGuard, AuthGuard)
  async createpaymentLink(
    @Args('createPaymentData') createPaymentData: CreatePaymentInput,
  ) {
    return this.paymentService.createPaymentLink(createPaymentData);
  }

  //get Payment details
  @Query(() => String)
  @UseGuards(AuthorizationGuard, AuthGuard)
  async getPaymentDetails(
    @Args('cs_test_key', { type: () => String }) cs_test_key: string,
  ) {
    return this.paymentService.getPaymentDetails(cs_test_key);
  }

  //update(Create) user payment table after payment has been successfully
  @Mutation(() => User_Payment)
  @UseGuards(AuthorizationGuard, AuthGuard)
  async createUserPayment(
    @Args('createPaymentData') createPaymentData: CreateUserPaymentInput,
  ) {
    return this.paymentService.createUserPayments(createPaymentData);
  }

  //create user payment options
  @Mutation(() => User_Payment_Option)
  @UseGuards(AuthorizationGuard, AuthGuard)
  async createUserPaymentOptions(
    @Args('createPaymentOptionData')
    createPaymentOptionData: CreateUserPaymentOptionInput,
  ) {
    return this.paymentService.createUserPaymentOptions(
      createPaymentOptionData,
    );
  }
}
