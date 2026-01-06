import { BaseValueObject } from 'src/shared/domain/base.vo';
import { z } from 'zod';

export class UserRole extends BaseValueObject<
  string | string[] | undefined | null
> {
  static readonly ADMIN = 'admin';
  static readonly USER = 'user';

  constructor(value: string | string[] | undefined | null) {
    super(value);
  }

  validate(value: string | string[] | undefined | null) {
    return z
      .union([
        z.enum([UserRole.ADMIN, UserRole.USER]),
        z.array(z.enum([UserRole.ADMIN, UserRole.USER])),
      ])
      .nullish()
      .parse(value);
  }
}
