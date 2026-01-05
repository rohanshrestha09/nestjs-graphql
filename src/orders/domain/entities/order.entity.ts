import { OrderAmount } from 'src/orders/domain/value-objects/order-amount.vo';
import { OrderCurrency } from 'src/orders/domain/value-objects/order-currency.vo';
import { OrderId } from 'src/orders/domain/value-objects/order-id.vo';
import { OrderStatus } from 'src/orders/domain/value-objects/order-status.vo';
import z from 'zod';

export class Order {
  constructor(
    private readonly _id: OrderId,
    private readonly _amount: OrderAmount,
    private readonly _currency: OrderCurrency,
    private readonly _status: OrderStatus,
  ) {}

  get id() {
    return this._id.value;
  }

  get amount() {
    return this._amount.value;
  }

  get currency() {
    return this._currency.value;
  }

  get status() {
    return this._status.value;
  }

  toJSON() {
    return {
      id: this.id,
      status: this.status,
      amount: this.amount,
      currency: this.currency,
    };
  }

  static validate(json: unknown) {
    const schema = z.object({
      id: z.string(),
      amount: z.number(),
      currency: z.string(),
      status: z.enum(['DRAFT', 'CONFIRMED']),
    });
    return schema.parse(json);
  }

  static fromJSON(json: unknown) {
    const result = this.validate(json);
    return new Order(
      new OrderId(result.id),
      new OrderAmount(result.amount),
      new OrderCurrency(result.currency),
      new OrderStatus(result.status),
    );
  }
}
