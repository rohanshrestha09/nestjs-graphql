import { ConfigService } from '@nestjs/config';
import { Db, MongoClient } from 'mongodb';

export const MONGODB_PROVIDER = 'MONGODB_PROVIDER';

export const mongodbProvider = {
  provide: MONGODB_PROVIDER,
  useFactory: async (configService: ConfigService): Promise<Db> => {
    const client = new MongoClient(
      configService.getOrThrow<string>('MONGODB_URI', { infer: true }),
    );
    await client.connect();
    return client.db();
  },
  inject: [ConfigService],
};
