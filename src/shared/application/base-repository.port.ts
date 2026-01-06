import { UserId } from 'src/users/domain/value-objects/user-id.vo';

export interface IRepositoryBaseQuery<T> {
  forUser(userId: UserId): Promise<T>;
  any(): Promise<T>;
}
