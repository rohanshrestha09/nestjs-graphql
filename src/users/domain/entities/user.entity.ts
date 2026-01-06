import { BaseEntity, PropsToGetters } from 'src/shared/domain/base.entity';
import { BaseValueObject } from 'src/shared/domain/base.vo';
import { UserEmail } from 'src/users/domain/value-objects/user-email.vo';
import { UserId } from 'src/users/domain/value-objects/user-id.vo';
import { UserImage } from 'src/users/domain/value-objects/user-image.vo';
import { UserName } from 'src/users/domain/value-objects/user-name.vo';
import { UserRole } from 'src/users/domain/value-objects/user-role.vo';
import { z } from 'zod';

interface UserProps extends Record<string, BaseValueObject<unknown>> {
  id: UserId;
  name: UserName;
  email: UserEmail;
  image: UserImage;
  role: UserRole;
}

export interface User extends PropsToGetters<UserProps> {}

export class User extends BaseEntity<UserProps> {
  private constructor(props: UserProps) {
    super(props);
  }

  static create(props: UserProps) {
    return new this(props);
  }

  static fromJSON(json: Record<string, unknown>) {
    const schema = z.object({
      id: z.custom<UserId>((v: string) => new UserId(v)),
      name: z.custom<UserName>((v: string) => new UserName(v)),
      email: z.custom<UserEmail>((v: string) => new UserEmail(v)),
      image: z.custom<UserImage>(
        (v: string | undefined | null) => new UserImage(v),
      ),
      role: z.custom<UserRole>(
        (v: string | string[] | undefined | null) => new UserRole(v),
      ),
    });
    return this.create(schema.parse(json));
  }
}
