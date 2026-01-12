import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { join } from 'path';
import { OrderModule } from 'src/orders/infrastructure/order.module';
import { AuthModule } from 'src/shared/infrastructure/auth/auth.module';
import {
  Configuration,
  validateConfiguration,
} from 'src/shared/infrastructure/config/configuration';
import { MongodbModule } from 'src/shared/infrastructure/database/mongodb.module';
import { SendgridModule } from 'src/shared/infrastructure/email/sendgrid.module';
import { RabbitMQModule } from 'src/shared/infrastructure/messaging/rabbitmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateConfiguration }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      graphiql: true,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<Configuration>) => [
        {
          ttl: configService.getOrThrow('throttling.ttl', {
            infer: true,
          }),
          limit: configService.getOrThrow('throttling.limit', {
            infer: true,
          }),
        },
      ],
      inject: [ConfigService],
    }),
    AuthModule,
    RabbitMQModule,
    MongodbModule,
    SendgridModule,
    OrderModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
