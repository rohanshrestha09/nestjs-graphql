export class OrderConfirmedEvent {
  static readonly EVENT_NAME = 'order_confirmed';

  constructor(
    readonly orderId: string,
    readonly confirmedAt: Date,
  ) {}

  toPayload() {
    return {
      orderId: this.orderId,
      confirmedAt: this.confirmedAt.toISOString(),
    };
  }
}
