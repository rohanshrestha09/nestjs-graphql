import { Global, Module } from '@nestjs/common';
import { mongodbProvider } from './mongodb.provider';

@Global()
@Module({
  providers: [mongodbProvider],
  exports: [mongodbProvider],
})
export class MongodbModule {}
