import { InferSession, InferUser } from 'better-auth/types';
import { auth } from './auth.config';

export type UserSession = {
  session: InferSession<typeof auth>;
  user: InferUser<typeof auth>;
};
