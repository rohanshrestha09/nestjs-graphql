import { Module } from '@nestjs/common';
import { OrderEventPublisherPort } from 'src/orders/application/ports/order-event-publisher.port';
import { OrderNotificationServicePort } from 'src/orders/application/ports/order-notification-service.port';
import { OrderPaymentServicePort } from 'src/orders/application/ports/order-payment-service.port';
import { OrderRepositoryPort } from 'src/orders/application/ports/order-repository.port';
import { ConfirmOrderUseCase } from 'src/orders/application/use-cases/confirm-order.usecase';
import { FindOrderUseCase } from 'src/orders/application/use-cases/find-order.usecase';
import { PayOrderUseCase } from 'src/orders/application/use-cases/pay-order.usecase';
import { MongoDBOrderRepository } from 'src/orders/infrastructure/database/mongodb-order.repository';
import { SendgridOrderNotificationService } from 'src/orders/infrastructure/external/sendgrid-order-notification.service';
import { StripeOrderPaymentService } from 'src/orders/infrastructure/external/stripe-order-payment.service';
import { RabbitMQOrderEventPublisher } from 'src/orders/infrastructure/messaging/rabbitmq-order-event.publisher';
import { OrderResolver } from 'src/orders/interfaces/graphql/resolvers/order.resolver';
import { OrderController } from 'src/orders/interfaces/http/controllers/order.controller';
import { OrderListener } from 'src/orders/interfaces/messaging/listeners/order.listener';

@Module({
  controllers: [OrderController],
  providers: [
    OrderResolver,
    OrderListener,
    ConfirmOrderUseCase,
    FindOrderUseCase,
    PayOrderUseCase,
    {
      provide: OrderRepositoryPort,
      useClass: MongoDBOrderRepository,
    },
    {
      provide: OrderEventPublisherPort,
      useClass: RabbitMQOrderEventPublisher,
    },
    {
      provide: OrderPaymentServicePort,
      useClass: StripeOrderPaymentService,
    },
    {
      provide: OrderNotificationServicePort,
      useClass: SendgridOrderNotificationService,
    },
  ],
})
export class OrderModule {}
