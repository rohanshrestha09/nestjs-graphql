import { Order } from 'src/orders/domain/entities/order.entity';
import { OrderId } from 'src/orders/domain/value-objects/order-id.vo';
import { IRepositoryBaseQuery } from 'src/shared/application/base-repository.port';

export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';

export interface OrderRepositoryPort {
  findById(id: OrderId): IRepositoryBaseQuery<Order | null>;
}
