import { ConfigService } from '@nestjs/config';
import * as sendgrid from '@sendgrid/mail';
import { Configuration } from 'src/shared/infrastructure/config/configuration';

export const SENDGRID_PROVIDER = 'SENDGRID_PROVIDER';

export const sendgridProvider = {
  provide: SENDGRID_PROVIDER,
  useFactory: (
    configService: ConfigService<Configuration>,
  ): sendgrid.MailService => {
    sendgrid.setApiKey(
      configService.getOrThrow('email.sendgrid.apiKey', {
        infer: true,
      }),
    );
    return sendgrid;
  },
  inject: [ConfigService],
};
