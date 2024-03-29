import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SendEmailDto {
  @Field()
  emailTo: string;

  @Field()
  emailSub: string;

  @Field()
  emailMsg: string;
}
