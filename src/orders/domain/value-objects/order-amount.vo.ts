export class OrderAmount {
  constructor(public readonly value: number) {
    if (value <= 0) {
      throw new Error('OrderAmount must be greater than 0');
    }
  }

  toString(): string {
    return this.value.toString();
  }
}
