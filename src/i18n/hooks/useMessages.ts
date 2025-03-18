'use client';

import { getMessages } from 'next-intl/server';

export async function useMessages(locale: string) {
  return getMessages({ locale });
}
