import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class ConfirmOrderInput {
  @Field(() => ID)
  orderId: string;
}
