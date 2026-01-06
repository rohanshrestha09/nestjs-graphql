import { BaseValueObject } from 'src/shared/domain/base.vo';
import { z } from 'zod';

export class UserEmail extends BaseValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  validate(value: string) {
    return z.email().parse(value.trim().toLowerCase());
  }
}
