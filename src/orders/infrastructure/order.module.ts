import { Module } from '@nestjs/common';
import {
  ORDER_EVENT_PUBLISHER,
  OrderEventPublisherPort,
} from 'src/orders/application/ports/order-event-publisher.port';
import {
  ORDER_NOTIFICATION_SERVICE,
  OrderNotificationServicePort,
} from 'src/orders/application/ports/order-notification-service.port';
import {
  ORDER_PAYMENT_SERVICE,
  OrderPaymentServicePort,
} from 'src/orders/application/ports/order-payment-service.port';
import {
  ORDER_REPOSITORY,
  OrderRepositoryPort,
} from 'src/orders/application/ports/order-repository.port';
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
    {
      provide: ORDER_REPOSITORY,
      useClass: MongoDBOrderRepository,
    },
    {
      provide: ORDER_EVENT_PUBLISHER,
      useClass: RabbitMQOrderEventPublisher,
    },
    {
      provide: ORDER_PAYMENT_SERVICE,
      useClass: StripeOrderPaymentService,
    },
    {
      provide: ORDER_NOTIFICATION_SERVICE,
      useClass: SendgridOrderNotificationService,
    },
    // Use cases with injected ports
    {
      provide: ConfirmOrderUseCase,
      useFactory: (
        orderRepository: OrderRepositoryPort,
        orderEventPublisher: OrderEventPublisherPort,
      ) => new ConfirmOrderUseCase(orderRepository, orderEventPublisher),
      inject: [ORDER_REPOSITORY, ORDER_EVENT_PUBLISHER],
    },
    {
      provide: FindOrderUseCase,
      useFactory: (orderRepository: OrderRepositoryPort) =>
        new FindOrderUseCase(orderRepository),
      inject: [ORDER_REPOSITORY],
    },
    {
      provide: PayOrderUseCase,
      useFactory: (
        orderRepository: OrderRepositoryPort,
        orderPaymentService: OrderPaymentServicePort,
        orderNotificationService: OrderNotificationServicePort,
      ) =>
        new PayOrderUseCase(
          orderRepository,
          orderPaymentService,
          orderNotificationService,
        ),
      inject: [
        ORDER_REPOSITORY,
        ORDER_PAYMENT_SERVICE,
        ORDER_NOTIFICATION_SERVICE,
      ],
    },
  ],
})
export class OrderModule {}
