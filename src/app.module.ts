import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { OrderModule } from 'src/orders/infrastructure/order.module';
import { AuthModule } from 'src/shared/infrastructure/auth/auth.module';
import { MongodbModule } from 'src/shared/infrastructure/database/mongodb.module';
import { SendgridModule } from 'src/shared/infrastructure/email/sendgrid.module';
import { RabbitMQModule } from 'src/shared/infrastructure/messaging/rabbitmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      graphiql: true,
    }),
    AuthModule,
    RabbitMQModule,
    MongodbModule,
    SendgridModule,
    OrderModule,
  ],
})
export class AppModule {}
