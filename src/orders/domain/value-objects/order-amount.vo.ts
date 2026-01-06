import { BaseValueObject } from 'src/shared/domain/base.vo';
import { z } from 'zod';

export class OrderAmount extends BaseValueObject<number> {
  constructor(value: number) {
    super(value);
  }

  validate(value: number) {
    return z.number().nonnegative().parse(value);
  }

  toCents(): number {
    return Math.round(this.value * 100);
  }

  format(currency: string): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(this.value);
  }
}
