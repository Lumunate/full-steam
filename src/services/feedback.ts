import { render } from '@react-email/render';

import FeedbackAcknowledgmentTemplate, { FeedbackAcknowledgmentProps } from '@/emails/feedback-acknowledgement';
import NewFeedbackNotificationTemplate, { NewFeedbackNotificationProps } from '@/emails/feedback-form-submission';
import { emailService, EmailError } from '@/lib/emails';
import * as FeedbackRepository from '@/repository/feedback';
import { IFeedback } from '@/types/feedback';

export async function createFeedback(data: IFeedback) {
  const feedback = await FeedbackRepository.createFeedback({
    ...data,
    email: data.email || '', 
  });

  if (data.email) {
    try {
      const emailProps: FeedbackAcknowledgmentProps = {
        ...feedback,
        email: data.email
      };

      await sendAcknowledgementEmail(data.email, emailProps);
    } catch (error) {
      throw new EmailError('Failed to send acknowledgement email', error);
    }
  }
  
  try {
    await sendClientRecieveEmail(feedback);
  } catch (error) {
    throw new EmailError('Failed to send notification email', error);
  }
  
  return feedback;
}

export async function getAllFeedbacks() {
  return FeedbackRepository.findAllFeedbacks();
}

export async function getFeedbackById(id: number) {
  return FeedbackRepository.findFeedbackById(id);
}

export async function sendAcknowledgementEmail(email: string, data: FeedbackAcknowledgmentProps): Promise<string> {
  try {
    const html = await render(FeedbackAcknowledgmentTemplate(data));

    const result = await emailService.sendRawEmail({
      to: email,
      subject: 'Thank you for your feedback - Full Steam Ahead',
      html: html,
      from: 'onboarding@resend.dev', 
      fromName: 'Full Steam Ahead',
      replyTo: 'no-reply@example.com',
    });

    if (!result.success) {
      throw new EmailError('Failed to send acknowledgement email', result.error);
    }

    return result.messageId || 'unknown';
  } catch (error) {
    if (error instanceof EmailError) {
      throw error;
    }
    throw new EmailError('Failed to prepare acknowledgement email', error);
  }
}

export async function sendClientRecieveEmail(data: NewFeedbackNotificationProps): Promise<string> {
  try {
    const html = await render(NewFeedbackNotificationTemplate(data));

    const result = await emailService.sendRawEmail({
      to: 'mumair299792458u@gmail.com', // This remains your email to receive notifications
      subject: 'New Feedback Form Submission',
      html: html,
      from: 'onboarding@resend.dev', // Use Resend test domain
      fromName: 'Full Steam Ahead Feedback',
      replyTo: 'no-reply@example.com',
    });

    if (!result.success) {
      throw new EmailError('Failed to send notification email', result.error);
    }

    return result.messageId || 'unknown';
  } catch (error) {
    if (error instanceof EmailError) {
      throw error;
    }
    throw new EmailError('Failed to prepare notification email', error);
  }
}