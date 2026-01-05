import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { ConfirmOrderUseCase } from 'src/orders/application/use-cases/confirm-order.usecase';
import { FindOrderUseCase } from 'src/orders/application/use-cases/find-order.usecase';
import { ConfirmOrderInput } from 'src/orders/interfaces/graphql/inputs/order.input';
import { OrderType } from 'src/orders/interfaces/graphql/types/order.type';

@Resolver(() => OrderType)
export class OrderResolver {
  constructor(
    private readonly confirmOrderUseCase: ConfirmOrderUseCase,
    private readonly findOrderUseCase: FindOrderUseCase,
  ) {}

  @Mutation(() => Boolean)
  async confirmOrder(
    @Args('input') input: ConfirmOrderInput,
  ): Promise<boolean> {
    await this.confirmOrderUseCase.execute(input.orderId);
    return true;
  }

  @Query(() => OrderType, { nullable: true })
  @AllowAnonymous()
  async findOrder(@Args('id') id: string): Promise<OrderType | null> {
    const order = await this.findOrderUseCase.execute(id);
    if (!order) return null;
    return order.toJSON();
  }
}
