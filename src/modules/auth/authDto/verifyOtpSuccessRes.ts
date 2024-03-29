import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class VerifyOtpSuccessResponse {
  @Field()
  message: string;

  @Field()
  status: number;

  @Field()
  token: string;
}
