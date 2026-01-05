import { Order } from 'src/orders/domain/entities/order.entity';
import { OrderId } from 'src/orders/domain/value-objects/order-id.vo';

export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';

export interface OrderRepositoryPort {
  findById(id: OrderId): Promise<Order | null>;
  save(order: Order): Promise<void>;
}
