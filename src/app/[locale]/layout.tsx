import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { routing } from '@/i18n/routing';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ParamsWithLocale = Promise<{ locale: any }>;

export default async function RootLayout({
  children, params,
}: Readonly<{ children: React.ReactNode, params: ParamsWithLocale }>) {

  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
