export class OrderCurrency {
  constructor(public readonly value: string) {
    if (!value) {
      throw new Error('OrderCurrency cannot be empty');
    }
  }
}
