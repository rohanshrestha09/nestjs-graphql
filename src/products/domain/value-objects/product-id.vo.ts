import { BaseValueObject } from 'src/shared/domain/base.vo';
import { z } from 'zod';

export class ProductId extends BaseValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  validate(value: string) {
    return z.string().length(24).parse(value);
  }
}
