import { Order } from 'src/orders/domain/entities/order.entity';

export const ORDER_PAYMENT_SERVICE = 'ORDER_PAYMENT_SERVICE';

export interface OrderPaymentResult {
  transactionId: string;
  status: 'success' | 'failed' | 'pending';
  amount: number;
  currency: string;
}

export interface OrderPaymentServicePort {
  charge(order: Order): Promise<OrderPaymentResult>;

  refund(transactionId: string, amount?: number): Promise<OrderPaymentResult>;

  getTransaction(transactionId: string): Promise<OrderPaymentResult | null>;
}
