import { Resend } from 'resend';

import {
  EmailOptions,
  EmailProvider,
  EmailProviderConfig,
  EmailSendResult,
} from '../interfaces';

export interface ResendConfig extends EmailProviderConfig {
  apiKey: string;
}

export class ResendProvider implements EmailProvider {
  private client: Resend;
  private config: ResendConfig;

  constructor(config: ResendConfig) {
    this.config = config;
    this.client = new Resend(config.apiKey);
  }

  async send(options: EmailOptions): Promise<EmailSendResult> {
    try {
      const { data, error } = await this.client.emails.send({
        from: options.fromName 
          ? `${options.fromName} <${options.from || this.config.defaultFrom}>`
          : options.from || this.config.defaultFrom,
        to: Array.isArray(options.to) ? options.to : [options.to],
        cc: options.cc
          ? Array.isArray(options.cc)
            ? options.cc
            : [options.cc]
          : undefined,
        bcc: options.bcc
          ? Array.isArray(options.bcc)
            ? options.bcc
            : [options.bcc]
          : undefined,
        replyTo: options.replyTo,
        subject: options.subject,
        html: options.html,
        text: options.text || '',
        attachments: options.attachments?.map(attachment => ({
          filename: attachment.filename,
          content: Buffer.isBuffer(attachment.content)
            ? attachment.content.toString('base64')
            : Buffer.from(attachment.content).toString('base64'),
        })),
      });

      if (error) {
        return {
          success: false,
          error: new Error(error.message),
        };
      }

      return {
        success: true,
        messageId: data?.id,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Unknown error'),
      };
    }
  }
}