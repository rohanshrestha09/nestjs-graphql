import { Global, Module } from '@nestjs/common';
import { sendgridProvider } from './sendgrid.provider';

@Global()
@Module({
  providers: [sendgridProvider],
  exports: [sendgridProvider],
})
export class SendgridModule {}
