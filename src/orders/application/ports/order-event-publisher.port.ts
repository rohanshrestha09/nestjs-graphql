import { OrderConfirmedEvent } from 'src/orders/domain/events/order-confirmed.event';

export abstract class OrderEventPublisherPort {
  abstract publishOrderConfirmed(event: OrderConfirmedEvent): Promise<void>;
}
