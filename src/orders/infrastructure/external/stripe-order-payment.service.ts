import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  OrderPaymentResult,
  OrderPaymentServicePort,
} from 'src/orders/application/ports/order-payment-service.port';
import { Order } from 'src/orders/domain/entities/order.entity';

@Injectable()
export class StripeOrderPaymentService implements OrderPaymentServicePort {
  constructor(private readonly configService: ConfigService) {}

  private readonly logger = new Logger(StripeOrderPaymentService.name);

  async charge(order: Order): Promise<OrderPaymentResult> {
    this.logger.log(
      `Charging ${order.amount} ${order.currency} for order ${order.id}`,
    );

    const response = await fetch(
      `${this.configService.getOrThrow<string>('STRIPE_API_URL', { infer: true })}/payment_intents`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.configService.getOrThrow<string>('STRIPE_API_KEY', { infer: true })}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          amount: order.amount.toString(),
          currency: order.currency,
          // customer: order.customerId,
          'metadata[orderId]': order.id,
        }),
      },
    );

    const data = (await response.json()) as {
      id: string;
      status: string;
      amount: number;
      currency: string;
    };

    return {
      transactionId: data.id,
      status: this.mapStripeStatus(data.status),
      amount: data.amount,
      currency: data.currency,
    };
  }

  async refund(
    transactionId: string,
    amount?: number,
  ): Promise<OrderPaymentResult> {
    this.logger.log(`Refunding transaction ${transactionId}`);

    const body: Record<string, string> = {
      payment_intent: transactionId,
    };
    if (amount) {
      body.amount = String(amount);
    }

    const response = await fetch(
      `${this.configService.getOrThrow<string>('STRIPE_API_URL', { infer: true })}/refunds`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.configService.getOrThrow<string>('STRIPE_API_KEY', { infer: true })}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(body),
      },
    );

    const data = (await response.json()) as {
      id: string;
      status: string;
      amount: number;
      currency: string;
    };

    return {
      transactionId: data.id,
      status: data.status === 'succeeded' ? 'success' : 'failed',
      amount: data.amount,
      currency: data.currency,
    };
  }

  async getTransaction(
    transactionId: string,
  ): Promise<OrderPaymentResult | null> {
    const response = await fetch(
      `${this.configService.getOrThrow<string>('STRIPE_API_URL', { infer: true })}/payment_intents/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${this.configService.getOrThrow<string>('STRIPE_API_KEY', { infer: true })}`,
        },
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as {
      id: string;
      status: string;
      amount: number;
      currency: string;
    };

    return {
      transactionId: data.id,
      status: this.mapStripeStatus(data.status),
      amount: data.amount,
      currency: data.currency,
    };
  }

  private mapStripeStatus(status: string): OrderPaymentResult['status'] {
    switch (status) {
      case 'succeeded':
        return 'success';
      case 'processing':
      case 'requires_action':
        return 'pending';
      default:
        return 'failed';
    }
  }
}
