import { Injectable, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { OrderConfirmedEvent } from 'src/orders/domain/events/order-confirmed.event';

interface OrderConfirmedPayload {
  orderId: string;
  confirmedAt: string;
}

@Injectable()
export class OrderListener {
  private readonly logger = new Logger(OrderListener.name);

  @EventPattern(OrderConfirmedEvent.EVENT_NAME)
  handleOrderConfirmed(@Payload() data: OrderConfirmedPayload) {
    this.logger.log(
      `Order confirmed event received: orderId=${data.orderId}, confirmedAt=${data.confirmedAt}`,
    );

    // Process the event, e.g., sending notifications, updating analytics, etc.
  }
}
