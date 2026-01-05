import { Inject, Injectable } from '@nestjs/common';
import { render } from '@react-email/components';
import { MailService } from '@sendgrid/mail';
import { OrderNotificationServicePort } from 'src/orders/application/ports/order-notification-service.port';
import { Order } from 'src/orders/domain/entities/order.entity';
import { PaymentReceiptEmail } from 'src/orders/infrastructure/templates/payment-receipt.template';
import { SENDGRID_PROVIDER } from 'src/shared/infrastructure/email/sendgrid.provider';

@Injectable()
export class SendgridOrderNotificationService implements OrderNotificationServicePort {
  constructor(
    @Inject(SENDGRID_PROVIDER)
    private readonly mailService: MailService,
  ) {}

  async sendPaymentReceipt(order: Order): Promise<void> {
    const html = await render(
      PaymentReceiptEmail({
        orderId: order.id,
        transactionId: '1234567890',
        amount: order.amount,
        currency: order.currency,
        customerName: 'John Doe',
      }),
    );

    await this.mailService.send({
      to: { email: 'customer@example.com', name: 'Customer' },
      from: { email: 'noreply@example.com', name: 'Payment Receipt' },
      subject: `Payment Receipt - Order ${order.id}`,
      html,
    });
  }
}
