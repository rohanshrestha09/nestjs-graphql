import { ConfigService } from '@nestjs/config';
import { Db, MongoClient } from 'mongodb';
import { Configuration } from 'src/shared/infrastructure/config/configuration';

export const MONGODB_PROVIDER = 'MONGODB_PROVIDER';

export const mongodbProvider = {
  provide: MONGODB_PROVIDER,
  useFactory: async (
    configService: ConfigService<Configuration>,
  ): Promise<Db> => {
    const client = new MongoClient(
      configService.getOrThrow('database.mongodb.uri', { infer: true }),
    );
    await client.connect();
    return client.db();
  },
  inject: [ConfigService],
};
