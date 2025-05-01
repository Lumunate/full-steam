import { UserRole } from '@prisma/client';
import { render } from '@react-email/render';

import RegistrationAcknowledgmentHelper from '@/emails/registration-acknowledgement-helper';
import RegistrationAcknowledgmentUser from '@/emails/registration-acknowledgement-user';
import { emailService, EmailError } from '@/lib/emails';
export async function sendHelperRegistrationEmail(
  email: string, 
  firstName: string,
  userEmail: string,
  isApproved: boolean
): Promise<string> {
  try {
    const html = await render(RegistrationAcknowledgmentHelper({
      firstName,
      email: userEmail,
      isApproved
    }));
    const result = await emailService.sendRawEmail({
      to: email,
      subject: 'Welcome to Full Steam Ahead - Your Mom Helper Registration',
      html: html,
      from: 'onboarding@resend.dev', 
      fromName: 'Full Steam Ahead',
      replyTo: 'no-reply@example.com',
    });

    if (!result.success) {
      throw new EmailError('Failed to send helper registration email', result.error);
    }

    return result.messageId || 'unknown';
  } catch (error) {
    if (error instanceof EmailError) {
      throw error;
    }
    throw new EmailError('Failed to prepare helper registration email', error);
  }
}
export async function sendUserRegistrationEmail(
  email: string, 
  firstName: string,
  userEmail: string
): Promise<string> {
  try {
    const html = await render(RegistrationAcknowledgmentUser({
      firstName,
      email: userEmail
    }));
    const result = await emailService.sendRawEmail({
      to: email,
      subject: 'Welcome to Full Steam Ahead - Your Family Account is Ready',
      html: html,
      from: 'onboarding@resend.dev', 
      fromName: 'Full Steam Ahead',
      replyTo: 'no-reply@example.com',
    });

    if (!result.success) {
      throw new EmailError('Failed to send user registration email', result.error);
    }

    return result.messageId || 'unknown';
  } catch (error) {
    if (error instanceof EmailError) {
      throw error;
    }
    throw new EmailError('Failed to prepare user registration email', error);
  }
}
export async function sendRegistrationEmail(
  email: string,
  firstName: string,
  role: UserRole,
  isApproved: boolean
): Promise<string | null> {
  try {
    if (role === UserRole.HELPER) {
      return await sendHelperRegistrationEmail(email, firstName, email, isApproved);
    } else if (role === UserRole.USER) {
      return await sendUserRegistrationEmail(email, firstName, email);
    }

    return null;
  } catch  {
    return null;
  }
}