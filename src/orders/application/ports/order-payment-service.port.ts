import { Order } from 'src/orders/domain/entities/order.entity';

export interface OrderPaymentResult {
  transactionId: string;
  status: 'success' | 'failed' | 'pending';
  amount: number;
  currency: string;
}

export abstract class OrderPaymentServicePort {
  abstract charge(order: Order): Promise<OrderPaymentResult>;

  abstract refund(
    transactionId: string,
    amount?: number,
  ): Promise<OrderPaymentResult>;

  abstract getTransaction(
    transactionId: string,
  ): Promise<OrderPaymentResult | null>;
}
