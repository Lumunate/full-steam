'use client';
import '@/styles/globals.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import React from 'react';

import { SnackbarProvider } from '@/components/snackbar';
import { ThemeRegistry } from '@/lib/theme';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const queryClient = new QueryClient();

  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider>
            <ThemeRegistry>
              <NuqsAdapter>{children}</NuqsAdapter>
            </ThemeRegistry>
          </SnackbarProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
