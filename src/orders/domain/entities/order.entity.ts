import { OrderAmount } from 'src/orders/domain/value-objects/order-amount.vo';
import { OrderCurrency } from 'src/orders/domain/value-objects/order-currency.vo';
import { OrderId } from 'src/orders/domain/value-objects/order-id.vo';
import { OrderStatus } from 'src/orders/domain/value-objects/order-status.vo';
import { BaseEntity, PropsToGetters } from 'src/shared/domain/base.entity';
import { BaseValueObject } from 'src/shared/domain/base.vo';
import { UserId } from 'src/users/domain/value-objects/user-id.vo';
import { z } from 'zod';

interface OrderProps extends Record<string, BaseValueObject<unknown>> {
  id: OrderId;
  userId: UserId;
  amount: OrderAmount;
  currency: OrderCurrency;
  status: OrderStatus;
}

export interface Order extends PropsToGetters<OrderProps> {}

export class Order extends BaseEntity<OrderProps> {
  private constructor(props: OrderProps) {
    super(props);
  }

  static create(props: OrderProps) {
    return new this(props);
  }

  static fromJSON(json: Record<string, unknown>) {
    const schema = z.object({
      id: z.custom<OrderId>((v: string) => new OrderId(v)),
      userId: z.custom<UserId>((v: string) => new UserId(v)),
      amount: z.custom<OrderAmount>((v: number) => new OrderAmount(v)),
      currency: z.custom<OrderCurrency>((v: string) => new OrderCurrency(v)),
      status: z.custom<OrderStatus>((v: string) => new OrderStatus(v)),
    });
    return this.create(schema.parse(json));
  }
}
