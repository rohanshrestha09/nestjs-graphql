import { Injectable, Logger } from '@nestjs/common';
import { OrderRepositoryPort } from 'src/orders/application/ports/order-repository.port';
import { Order } from 'src/orders/domain/entities/order.entity';
import { OrderId } from 'src/orders/domain/value-objects/order-id.vo';
import { UserSession } from 'src/shared/infrastructure/auth/auth.type';
import { UserId } from 'src/users/domain/value-objects/user-id.vo';

@Injectable()
export class FindOrderUseCase {
  private readonly logger = new Logger(FindOrderUseCase.name);

  constructor(private readonly orderRepository: OrderRepositoryPort) {}

  async execute(
    session: UserSession,
    rawOrderId: string,
  ): Promise<Order | null> {
    const orderId = new OrderId(rawOrderId);
    const userId = new UserId(session.user.id);
    return await this.orderRepository.findById(orderId).forUser(userId);
  }
}
