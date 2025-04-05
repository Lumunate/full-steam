import emailConfig from './config';
import EmailService, { EmailError } from './email-service';
import {
  EmailProviderType,
  EmailServiceFactory,
} from './email-service-factory';

const createEmailService = () => {
  const provider = EmailServiceFactory.createProvider(
    emailConfig.provider as EmailProviderType,
    emailConfig[emailConfig.provider as EmailProviderType],
  );

  return new EmailService(provider);
};

const globalForEmailService = globalThis as unknown as {
  emailService: EmailService | undefined;
};

export const emailService =
  globalForEmailService.emailService ?? createEmailService();

if (process.env.NODE_ENV !== 'production')
  globalForEmailService.emailService = emailService;

export { EmailError };
export type { EmailOptions, EmailSendResult } from './providers/interfaces';