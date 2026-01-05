export class OrderId {
  constructor(public readonly value: string) {
    if (!value) {
      throw new Error('OrderId cannot be empty');
    }

    if (value.length !== 24) {
      throw new Error('OrderId must be 24 characters long');
    }
  }
}
