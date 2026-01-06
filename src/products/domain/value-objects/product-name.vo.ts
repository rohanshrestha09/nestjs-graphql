import { BaseValueObject } from 'src/shared/domain/base.vo';
import { z } from 'zod';

export class ProductName extends BaseValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  validate(value: string) {
    return z.string().parse(value);
  }
}
