export class OrderConfirmedEvent {
  static readonly EVENT_NAME = 'order_confirmed';

  constructor(
    public readonly orderId: string,
    public readonly confirmedAt: Date,
  ) {}

  toPayload() {
    return {
      orderId: this.orderId,
      confirmedAt: this.confirmedAt.toISOString(),
    };
  }
}
