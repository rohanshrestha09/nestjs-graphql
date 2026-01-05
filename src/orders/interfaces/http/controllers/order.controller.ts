import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { Session, UserSession } from '@thallesp/nestjs-better-auth';
import { ConfirmOrderUseCase } from 'src/orders/application/use-cases/confirm-order.usecase';
import { FindOrderUseCase } from 'src/orders/application/use-cases/find-order.usecase';
import {
  confirmOrderRequestDto,
  ConfirmOrderRequestDto,
} from 'src/orders/interfaces/http/dto/confirm-order.request';
import { ZodValidationPipe } from 'src/shared/infrastructure/pipes/zod-validation.pipe';

@Controller('order')
export class OrderController {
  constructor(
    private readonly confirmOrder: ConfirmOrderUseCase,
    private readonly findOrder: FindOrderUseCase,
  ) {}

  @Post('confirm')
  @UsePipes(new ZodValidationPipe(confirmOrderRequestDto))
  async confirm(
    @Session() _session: UserSession,
    @Body() body: ConfirmOrderRequestDto,
  ) {
    await this.confirmOrder.execute(body.orderId);
    return { message: 'Order confirmed' };
  }

  @Get(':id')
  async find(@Session() _session: UserSession, @Param('id') id: string) {
    const order = await this.findOrder.execute(id);
    if (!order) return { message: 'Order not found' };
    return order.toJSON();
  }
}
