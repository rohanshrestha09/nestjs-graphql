import { BaseValueObject } from 'src/shared/domain/base.vo';
import { z } from 'zod';

export class ProductBasePrice extends BaseValueObject<number> {
  constructor(value: number) {
    super(value);
  }

  validate(value: number) {
    return z.number().nonnegative().parse(value);
  }
}
