import { BaseValueObject } from 'src/shared/domain/base.vo';
import { z } from 'zod';

export class UserImage extends BaseValueObject<string | undefined | null> {
  constructor(value: string | undefined | null) {
    super(value);
  }

  validate(value: string | undefined | null) {
    return z.url().nullish().parse(value);
  }
}
