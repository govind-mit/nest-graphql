import { Field, Int, Float, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  schedule_id: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @Field({ nullable: true })
  payment_date?: Date;
}

@InputType()
export class UpdateOrderInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  order_id: number;

  @Field()
  @IsNotEmpty()
  transaction_id: string;

  @Field()
  @IsNotEmpty()
  status: string;
}
