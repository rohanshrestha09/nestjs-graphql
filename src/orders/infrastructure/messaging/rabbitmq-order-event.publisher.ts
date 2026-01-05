import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { OrderEventPublisherPort } from 'src/orders/application/ports/order-event-publisher.port';
import { OrderConfirmedEvent } from 'src/orders/domain/events/order-confirmed.event';
import { RABBITMQ_PROVIDER } from 'src/shared/infrastructure/messaging/rabbitmq.provider';

@Injectable()
export class RabbitMQOrderEventPublisher implements OrderEventPublisherPort {
  constructor(
    @Inject(RABBITMQ_PROVIDER)
    private readonly client: ClientProxy,
  ) {}

  async publishOrderConfirmed(event: OrderConfirmedEvent): Promise<void> {
    await firstValueFrom(
      this.client.emit(OrderConfirmedEvent.EVENT_NAME, event.toPayload()),
    );
  }
}
