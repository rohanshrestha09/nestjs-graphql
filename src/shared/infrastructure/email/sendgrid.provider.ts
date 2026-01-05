import { ConfigService } from '@nestjs/config';
import * as sendgrid from '@sendgrid/mail';

export const SENDGRID_PROVIDER = 'SENDGRID_PROVIDER';

export const sendgridProvider = {
  provide: SENDGRID_PROVIDER,
  useFactory: (configService: ConfigService): sendgrid.MailService => {
    sendgrid.setApiKey(
      configService.getOrThrow<string>('SENDGRID_API_KEY', { infer: true }),
    );
    return sendgrid;
  },
  inject: [ConfigService],
};
