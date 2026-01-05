import { Module, Global } from '@nestjs/common';
import { rabbitmqProvider } from './rabbitmq.provider';

@Global()
@Module({
  providers: [rabbitmqProvider],
  exports: [rabbitmqProvider],
})
export class RabbitMQModule {}
