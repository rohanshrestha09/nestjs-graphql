import { Order } from 'src/orders/domain/entities/order.entity';
import { OrderRepositoryPort } from 'src/orders/application/ports/order-repository.port';
import { OrderId } from 'src/orders/domain/value-objects/order-id.vo';

export class FindOrderUseCase {
  constructor(private readonly orderRepository: OrderRepositoryPort) {}

  async execute(rawOrderId: string): Promise<Order | null> {
    const orderId = new OrderId(rawOrderId);
    return await this.orderRepository.findById(orderId);
  }
}
