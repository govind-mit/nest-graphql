import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsInt, IsDate, IsString } from 'class-validator';

@InputType()
export class CreateScheduleInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @Field({ nullable: true })
  schedule_id?: number;

  @Field()
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @Field()
  @IsString()
  @IsNotEmpty()
  start_time: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  end_time: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  // Description: type means free or paid schedule
  type: string;

  @Field({ nullable: true })
  status?: string;
  // Description: status means cancled or done by default null
}
