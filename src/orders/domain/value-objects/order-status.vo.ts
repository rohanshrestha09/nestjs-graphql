export class OrderStatus {
  static readonly DRAFT = 'DRAFT';
  static readonly CONFIRMED = 'CONFIRMED';

  constructor(public readonly value: 'DRAFT' | 'CONFIRMED') {
    if (!value) {
      throw new Error('OrderStatus cannot be empty');
    }

    if (value !== OrderStatus.DRAFT && value !== OrderStatus.CONFIRMED) {
      throw new Error('Invalid order status');
    }
  }
}
