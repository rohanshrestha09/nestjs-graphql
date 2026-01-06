import { BaseValueObject } from 'src/shared/domain/base.vo';
import { z } from 'zod';

export class ProductSlug extends BaseValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  validate(value: string) {
    return z
      .string()
      .min(1)
      .transform((v) =>
        v
          .trim()
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, ''),
      )
      .parse(value);
  }
}
