import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CurrentUserData {
  @Field()
  id: number;

  @Field()
  email: string;

  @Field()
  name: string;
}
