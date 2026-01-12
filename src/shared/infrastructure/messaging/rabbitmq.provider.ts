import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Configuration } from 'src/shared/infrastructure/config/configuration';

export const RABBITMQ_PROVIDER = 'RABBITMQ_PROVIDER';

export const rabbitmqProvider = {
  provide: RABBITMQ_PROVIDER,
  useFactory: (configService: ConfigService<Configuration>): ClientProxy => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          configService.getOrThrow<string>('messaging.rabbitmq.uri', {
            infer: true,
          }),
        ],
        queue: configService.getOrThrow('messaging.rabbitmq.queue', {
          infer: true,
        }),
        queueOptions: {
          durable: false,
        },
      },
    });
  },
  inject: [ConfigService],
};
