import { Order } from 'src/orders/domain/entities/order.entity';

export const ORDER_NOTIFICATION_SERVICE = 'ORDER_NOTIFICATION_SERVICE';

export interface OrderNotificationServicePort {
  sendPaymentReceipt(order: Order): Promise<void>;
}
