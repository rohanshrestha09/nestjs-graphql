import { Injectable, Logger } from '@nestjs/common';
import { OrderNotificationServicePort } from 'src/orders/application/ports/order-notification-service.port';
import { OrderPaymentServicePort } from 'src/orders/application/ports/order-payment-service.port';
import { OrderRepositoryPort } from 'src/orders/application/ports/order-repository.port';
import { OrderNotFoundException } from 'src/orders/domain/exceptions/order-not-found.exception';
import { OrderId } from 'src/orders/domain/value-objects/order-id.vo';
import { UserSession } from 'src/shared/infrastructure/auth/auth.type';
import { UserId } from 'src/users/domain/value-objects/user-id.vo';

@Injectable()
export class PayOrderUseCase {
  private readonly logger = new Logger(PayOrderUseCase.name);

  constructor(
    private readonly orderRepository: OrderRepositoryPort,
    private readonly orderPaymentService: OrderPaymentServicePort,
    private readonly orderNotificationService: OrderNotificationServicePort,
  ) {}

  async execute(session: UserSession, rawOrderId: string): Promise<void> {
    const orderId = new OrderId(rawOrderId);
    const userId = new UserId(session.user.id);

    const order = await this.orderRepository.findById(orderId).forUser(userId);
    if (!order) {
      throw new OrderNotFoundException(orderId.value);
    }

    const paymentResult = await this.orderPaymentService.charge(order);

    if (paymentResult.status === 'failed') {
      throw new Error('Payment failed');
    }

    await this.orderNotificationService.sendPaymentReceipt(order);
  }
}
