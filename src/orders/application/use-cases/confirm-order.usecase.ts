import { OrderEventPublisherPort } from 'src/orders/application/ports/order-event-publisher.port';
import { OrderRepositoryPort } from 'src/orders/application/ports/order-repository.port';
import { OrderConfirmedEvent } from 'src/orders/domain/events/order-confirmed.event';
import { OrderNotFoundException } from 'src/orders/domain/exceptions/order-not-found.exception';
import { OrderId } from 'src/orders/domain/value-objects/order-id.vo';

export class ConfirmOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepositoryPort,
    private readonly orderEventPublisher: OrderEventPublisherPort,
  ) {}

  async execute(rawOrderId: string): Promise<void> {
    const orderId = new OrderId(rawOrderId);

    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new OrderNotFoundException(orderId.value);
    }

    await this.orderRepository.save(order);

    const event = new OrderConfirmedEvent(orderId.value, new Date());
    await this.orderEventPublisher.publishOrderConfirmed(event);
  }
}
