import { EmailProvider } from './providers/interfaces';
import { ResendConfig, ResendProvider } from './providers/resend';

export type EmailProviderType = 'resend';

export class EmailServiceFactory {
  static createProvider(type: EmailProviderType, config: any): EmailProvider {
    switch (type) {
    case 'resend':
      return new ResendProvider(config as ResendConfig);
    default:
      throw new Error(`Unsupported email provider type: ${type}`);
    }
  }
}