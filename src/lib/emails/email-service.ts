import React from 'react';

import {
  EmailProvider,
  EmailOptions,
  EmailSendResult,
} from './providers/interfaces';
import ReactEmailRenderer from './react-email-renderer';

export class EmailError extends Error {
  constructor(message: string, public cause?: unknown) {
    super(message);
    this.name = 'EmailError';
  }
}

class EmailService {
  private provider: EmailProvider;

  constructor(provider: EmailProvider) {
    this.provider = provider;
  }

  /**
   * Change email provider at runtime
   */
  setProvider(provider: EmailProvider): void {
    this.provider = provider;
  }

  /**
   * Send an email using a React Email template
   */
  async sendEmail(
    options: EmailOptions,
    Template: React.ComponentType<any>,
    props: any,
  ): Promise<EmailSendResult> {
    try {
      const emailComponent = React.createElement(Template, props);
      const emailHtml = await ReactEmailRenderer.renderToHtml(emailComponent);
      const emailText = await ReactEmailRenderer.renderToText(emailComponent);

      return this.provider.send({ ...options, html: emailHtml, text: emailText });
    } catch (error) {
      if (error instanceof EmailError) {
        throw error;
      }
      throw new EmailError('Failed to prepare email template', error);
    }
  }
  /**
   * Send an email with pre-rendered HTML content
   */
  async sendRawEmail(options: EmailOptions): Promise<EmailSendResult> {
    return this.provider.send(options);
  }
}

export default EmailService;