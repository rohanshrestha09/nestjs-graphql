import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

export const RABBITMQ_PROVIDER = 'RABBITMQ_PROVIDER';

export const rabbitmqProvider = {
  provide: RABBITMQ_PROVIDER,
  useFactory: (configService: ConfigService): ClientProxy => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          configService.getOrThrow<string>('RABBITMQ_URI', { infer: true }),
        ],
        queue: configService.getOrThrow<string>('RABBITMQ_QUEUE', {
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
