import { InputType, Field, Float } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class CreatePaymentInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  product_name?: string;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  customer_name?: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  customer_email?: string;
}

@InputType()
export class CreateUserPaymentInput {
  @Field()
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  customer_id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  payment_profile_id: string;
}

@InputType()
export class CreateUserPaymentOptionInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  user_payment_id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  option_name: string;

  @Field(() => GraphQLJSONObject)
  @IsNotEmpty()
  option_value: Record<string, any>[];
}
