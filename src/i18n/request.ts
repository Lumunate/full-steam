import {getRequestConfig} from 'next-intl/server';

// Define the default locale for the application
export const defaultLocale = 'en';

// Define all available locales for the application
export const locales = ['en', 'es', 'fr'] as const;

// Export request configuration for next-intl
export default getRequestConfig(async ({locale}) => {
  // Load messages for the requested locale
  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    messages,
    // You can provide additional configuration options here:
    // timeZone: 'Europe/London',
    // now: new Date(),
    // formats: {...},
  };
});

