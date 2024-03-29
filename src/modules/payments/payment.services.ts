import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  CreatePaymentInput,
  CreateUserPaymentInput,
  CreateUserPaymentOptionInput,
} from './paymentDto/createPaymentInput';
import Stripe from 'stripe';
import { InjectRepository } from '@nestjs/typeorm';
import { User_Payment } from 'src/graphql/models/user_payments';
import { Repository } from 'typeorm';
import { OptionService } from '../options/option.services';
import { User_Payment_Option } from 'src/graphql/models/user_payment_options';
import configuration from 'config/configuration';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(User_Payment)
    private userPaymentRepository: Repository<User_Payment>,
    @InjectRepository(User_Payment_Option)
    private paymentoptionService: Repository<User_Payment_Option>,
    private readonly optionService: OptionService,
  ) {}

  async createPaymentLink(createPaymentData: CreatePaymentInput) {
    const stripekey =
      await this.optionService.findOptionByOptionKey('org_stripe_keys');
    //add stripe key
    const stripe = new Stripe(stripekey?.option_value?.stripe_pk);
    try {
      //create customer for this payment
      const customer = await stripe.customers.create({
        email: createPaymentData?.customer_email,
        name: createPaymentData?.customer_name,
      });
      //create checkout session for this payment
      const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: createPaymentData?.product_name,
              },
              unit_amount: createPaymentData?.amount * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${configuration().appUrl}{CHECKOUT_SESSION_ID}`,
        cancel_url: `${configuration().appUrl}paymentcancel`,
      });
      return session.url;
    } catch (error) {
      throw new InternalServerErrorException(
        'An Internal server error occurred',
        error.message,
      );
    }
  }

  // get payment details
  async getPaymentDetails(cs_test_key: string): Promise<any | undefined> {
    const stripekey =
      await this.optionService.findOptionByOptionKey('org_stripe_keys');
    const stripe = new Stripe(stripekey?.option_value?.stripe_pk);
    try {
      const session = await stripe.checkout.sessions.retrieve(cs_test_key);
      return JSON.stringify(session);
    } catch (error) {
      throw new InternalServerErrorException(
        'An Internal server error occurred',
        error.message,
      );
    }
  }

  //inset payment details user payment table
  async createUserPayments(createPaymentData: CreateUserPaymentInput) {
    try {
      return this.userPaymentRepository.save(createPaymentData);
    } catch (error) {
      throw new InternalServerErrorException(
        'An Internal server error occurred',
        error.message,
      );
    }
  }

  //create user payment options
  async createUserPaymentOptions(
    createPaymentOptionData: CreateUserPaymentOptionInput,
  ) {
    try {
      return this.paymentoptionService.save(createPaymentOptionData);
    } catch (error) {
      throw new InternalServerErrorException(
        'An Internal server error occurred',
        error.message,
      );
    }
  }
}
