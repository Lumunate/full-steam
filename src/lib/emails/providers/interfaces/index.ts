export interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: EmailAttachment[];
  replyTo?: string;
  fromName?: string;
}

export interface EmailAttachment {
  filename: string;
  content: string | Buffer;
  contentType?: string;
}

export interface EmailProviderConfig {
  defaultFrom: string;
  [key: string]: any;
}

export interface EmailProvider {
  send(options: EmailOptions): Promise<EmailSendResult>;
}

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: Error;
}