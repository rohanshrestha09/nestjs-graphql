import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { Roles, Session, UserSession } from '@thallesp/nestjs-better-auth';
import { ConfirmOrderUseCase } from 'src/orders/application/use-cases/confirm-order.usecase';
import { FindOrderUseCase } from 'src/orders/application/use-cases/find-order.usecase';
import { Order } from 'src/orders/domain/entities/order.entity';
import {
  confirmOrderRequestDto,
  ConfirmOrderRequestDto,
} from 'src/orders/interfaces/http/dto/confirm-order.request';
import { ZodValidationPipe } from 'src/shared/infrastructure/pipes/zod-validation.pipe';
import { UserRole } from 'src/users/domain/value-objects/user-role.vo';

@Controller('order')
export class OrderController {
  constructor(
    private readonly confirmOrder: ConfirmOrderUseCase,
    private readonly findOrder: FindOrderUseCase,
  ) {}

  @Post('confirm')
  @UsePipes(new ZodValidationPipe(confirmOrderRequestDto))
  async confirm(
    @Session() session: UserSession,
    @Body() body: ConfirmOrderRequestDto,
  ) {
    await this.confirmOrder.execute(session, body.orderId);
    return { message: 'Order confirmed' };
  }

  @Get(':id')
  @Roles([UserRole.ADMIN])
  async find(
    @Session() session: UserSession,
    @Param('id') id: string,
  ): Promise<ReturnType<Order['toJSON']> | null> {
    const order = await this.findOrder.execute(session, id);
    if (!order) return null;
    return order.toJSON();
  }
}
