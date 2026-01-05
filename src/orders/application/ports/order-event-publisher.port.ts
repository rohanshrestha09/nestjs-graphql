import { OrderConfirmedEvent } from 'src/orders/domain/events/order-confirmed.event';

export const ORDER_EVENT_PUBLISHER = 'ORDER_EVENT_PUBLISHER';

export interface OrderEventPublisherPort {
  publishOrderConfirmed(event: OrderConfirmedEvent): Promise<void>;
}
