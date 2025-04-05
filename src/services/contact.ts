import { render } from '@react-email/render';

import ContactAcknowledgmentTemplate, { ContactAcknowledgmentProps } from '@/emails/contact-acknowledgement';
import NewContactNotificationTemplate, { NewContactNotificationProps } from '@/emails/contact-form-submission';
import { emailService, EmailError } from '@/lib/emails';
import * as ContactRepository from '@/repository/contact';
import { IContact } from '@/types/contact';

export async function createContact(data: IContact) {
  const contact = await ContactRepository.createContact(data);

  if (data.email) {
    try {
      const emailProps: ContactAcknowledgmentProps = {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        message: data.message,
        phone: data.phone
      };

      await sendAcknowledgementEmail(data.email, emailProps);
    } catch (error) {
      throw new EmailError('Failed to send acknowledgement email', error);
    }
  }
  
  try {
    await sendClientRecieveEmail(contact);
  } catch (error) {
    throw new EmailError('Failed to send notification email', error);
  }

  return contact;
}

export async function getAllContacts() {
  return ContactRepository.findAllContacts();
}

export async function getContactById(id: string) {
  return ContactRepository.findContactById(id);
}

async function sendAcknowledgementEmail(email: string, data: ContactAcknowledgmentProps): Promise<string> {
  try {
    const html = await render(ContactAcknowledgmentTemplate(data));

    const result = await emailService.sendRawEmail({
      to: email,
      subject: 'Thank you for contacting Acemyexam',
      html: html,
      from: 'onboarding@resend.dev', 
      fromName: 'Full Steam Ahead',
      replyTo: 'mumair299792458u@gmail.com',
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

async function sendClientRecieveEmail(data: NewContactNotificationProps): Promise<string> {
  try {
    const html = await render(NewContactNotificationTemplate(data));

    const result = await emailService.sendRawEmail({
      to: 'mumair299792458u@gmail.com', 
      subject: 'New Contact Form Submission',
      html: html,
      from: 'onboarding@resend.dev', 
      fromName: 'Full Steam Ahead Contact',
      replyTo: 'mumair299792458u@gmail.com',
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