import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles, Session, UserSession } from '@thallesp/nestjs-better-auth';
import { ConfirmOrderUseCase } from 'src/orders/application/use-cases/confirm-order.usecase';
import { FindOrderUseCase } from 'src/orders/application/use-cases/find-order.usecase';
import { ConfirmOrderInput } from 'src/orders/interfaces/graphql/inputs/order.input';
import { OrderType } from 'src/orders/interfaces/graphql/types/order.type';
import { UserRole } from 'src/users/domain/value-objects/user-role.vo';

@Resolver(() => OrderType)
export class OrderResolver {
  constructor(
    private readonly confirmOrderUseCase: ConfirmOrderUseCase,
    private readonly findOrderUseCase: FindOrderUseCase,
  ) {}

  @Mutation(() => Boolean)
  async confirmOrder(
    @Session() session: UserSession,
    @Args('input') input: ConfirmOrderInput,
  ): Promise<boolean> {
    await this.confirmOrderUseCase.execute(session, input.orderId);
    return true;
  }

  @Query(() => OrderType, { nullable: true })
  @Roles([UserRole.ADMIN])
  async findOrder(
    @Session() session: UserSession,
    @Args('id') id: string,
  ): Promise<OrderType | null> {
    const order = await this.findOrderUseCase.execute(session, id);
    if (!order) return null;
    return order.toJSON();
  }
}
