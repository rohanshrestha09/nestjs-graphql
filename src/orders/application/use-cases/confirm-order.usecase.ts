import { Injectable, Logger } from '@nestjs/common';
import { OrderEventPublisherPort } from 'src/orders/application/ports/order-event-publisher.port';
import { OrderRepositoryPort } from 'src/orders/application/ports/order-repository.port';
import { OrderConfirmedEvent } from 'src/orders/domain/events/order-confirmed.event';
import { OrderNotFoundException } from 'src/orders/domain/exceptions/order-not-found.exception';
import { OrderId } from 'src/orders/domain/value-objects/order-id.vo';
import { UserSession } from 'src/shared/infrastructure/auth/auth.type';
import { UserId } from 'src/users/domain/value-objects/user-id.vo';

@Injectable()
export class ConfirmOrderUseCase {
  private readonly logger = new Logger(ConfirmOrderUseCase.name);

  constructor(
    private readonly orderRepository: OrderRepositoryPort,
    private readonly orderEventPublisher: OrderEventPublisherPort,
  ) {}

  async execute(session: UserSession, rawOrderId: string): Promise<void> {
    const orderId = new OrderId(rawOrderId);
    const userId = new UserId(session.user.id);

    const order = await this.orderRepository.findById(orderId).forUser(userId);
    if (!order) {
      throw new OrderNotFoundException(orderId.value);
    }

    const event = new OrderConfirmedEvent(order.id, new Date());
    await this.orderEventPublisher.publishOrderConfirmed(event);
  }
}
