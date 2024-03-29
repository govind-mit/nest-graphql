import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsObject } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class CreateOptionInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  option_key: string;

  @Field(() => GraphQLJSONObject)
  @IsNotEmpty()
  @IsObject()
  option_value: Record<string, any>[];
}
