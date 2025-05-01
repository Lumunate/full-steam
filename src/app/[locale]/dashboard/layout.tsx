'use client';
import { Box, CircularProgress } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import DashBoardNavBar from '@/features/dashboard/dashboard-navbar/DashBoardNavBar';
import DashBoardWelcome from '@/features/dashboard/dashboard-welcome/DashBoardWelcome';
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/en');

      return;
    }
    if (status === 'authenticated' && session?.user?.role) {
      const userRole = session.user.role;

      if (pathname?.includes('/dashboard/admin/')) {
        if (userRole === 'ADMIN' || userRole === 'SERVICE_MASTER') {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
          const redirectPath = userRole === 'USER' 
            ? '/en/dashboard/mom/overview' 
            : '/en/dashboard';

          router.push(redirectPath);
        }
      }
      else if (pathname?.includes('/dashboard/mom/')) {
        if (userRole === 'USER') {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
          const redirectPath = userRole === 'ADMIN' || userRole === 'SERVICE_MASTER'
            ? '/en/dashboard/admin/overview'
            : '/en/dashboard';

          router.push(redirectPath);
        }
      }
      else if (pathname?.includes('/dashboard')) {
        if (userRole === 'HELPER') {
          setIsAuthorized(true);
        } else if (userRole === 'USER') {
          setIsAuthorized(false);
          router.push('/en/dashboard/mom/overview');
        } else if (userRole === 'ADMIN' || userRole === 'SERVICE_MASTER') {
          setIsAuthorized(false);
          router.push('/en/dashboard/admin/overview');
        } else {
          setIsAuthorized(true);
        }
      }
    }
  }, [status, router, pathname, session]);
  if (status === 'loading' || isAuthorized === null) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <CircularProgress />
      </Box>
    );
  }
  if (isAuthorized === false) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', direction: 'row' }}>
      <DashBoardNavBar />
      <Box
        sx={{
          width: '100%',
          paddingTop: '42px',
          paddingLeft: '32px',
          paddingRight: '32px',
        }}
      >
        <DashBoardWelcome />
        <Box sx={{ padding: '23px 0' }}>{children}</Box>
      </Box>
    </Box>
  );
}