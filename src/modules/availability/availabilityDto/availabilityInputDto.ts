import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class CreateAvailabilityInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  key: string;

  @Field(() => GraphQLJSONObject)
  @IsNotEmpty()
  @IsObject()
  value: Record<string, any>[];
}
