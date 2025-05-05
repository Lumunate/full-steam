import { EmailProviderType } from '../email-service-factory';

const emailConfig = {
  provider: (process.env.EMAIL_PROVIDER || 'resend') as EmailProviderType,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',

  resend: {
    defaultFrom: process.env.EMAIL_SENDER,
    apiKey: process.env.RESEND_API_KEY || '',
    testMode: false 
  },
};

export default emailConfig;