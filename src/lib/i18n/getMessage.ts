import {getMessages} from 'next-intl/server';

export async function fetchMessages(locale: string) {
  return getMessages({ locale });
}
