import '@/styles/globals.css';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';

import { fetchMessages } from '@/lib/i18n/getMessage';
import theme from '@/lib/theme';

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  const queryClient = new QueryClient();
  const messages = await fetchMessages(params.locale);

  return (
    <html lang={params.locale}>
      <body>
        <NextIntlClientProvider messages={messages} locale={params.locale}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </QueryClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
