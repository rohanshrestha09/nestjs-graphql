import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('Order')
export class OrderType {
  @Field(() => ID)
  id: string;

  @Field()
  status: string;
}
