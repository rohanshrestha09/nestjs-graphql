import { BaseValueObject } from 'src/shared/domain/base.vo';
import { z } from 'zod';

export class OrderStatus extends BaseValueObject<string> {
  static readonly DRAFT = 'DRAFT';
  static readonly CONFIRMED = 'CONFIRMED';

  constructor(value: string) {
    super(value);
  }

  validate(value: string) {
    return z.enum([OrderStatus.DRAFT, OrderStatus.CONFIRMED]).parse(value);
  }
}
