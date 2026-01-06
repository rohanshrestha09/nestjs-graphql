import { BaseValueObject } from 'src/shared/domain/base.vo';
import { z } from 'zod';

export class ProductCoverImage extends BaseValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  validate(value: string) {
    return z.url().parse(value);
  }
}
