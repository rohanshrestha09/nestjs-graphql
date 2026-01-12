import { Order } from 'src/orders/domain/entities/order.entity';

export abstract class OrderNotificationServicePort {
  abstract sendPaymentReceipt(order: Order): Promise<void>;
}
