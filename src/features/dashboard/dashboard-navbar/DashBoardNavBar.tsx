'use client';
import { Box, styled } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { Link } from '@/i18n/routing';

import { DashBoardNav } from './DashBoardNavBar.style';
import { DashBoardOption, DashBoardOptions } from './DashBoardNavBar.style';
import { DashBoardTypography } from './DashBoardNavBar.style';
const DisabledNavOption = styled(DashBoardOption)(({ theme }) => ({
  opacity: 0.6,
  cursor: 'not-allowed',
  '&:hover': {
    cursor: 'not-allowed',
    backgroundColor: 'transparent'
  }
}));
const links = {
  mom: [
    { heading: 'Dashboard', imageUrl: '/dashboard/home.svg', link: '/dashboard/mom/overview' },
    { heading: 'Orders', imageUrl: '/dashboard/calendar.svg', link: '/dashboard/mom/order-mgmt' },
    { heading: 'Payments', imageUrl: '/dashboard/earnings.svg', link: '/dashboard/mom/earnings' },
    { heading: 'Saved Helpers', imageUrl: '/dashboard/message.svg', link: '/dashboard/mom/profile-view' },
    { heading: 'Monitoring', imageUrl: '/dashboard/monitoring.svg', link: '/dashboard/mom/profile' },
    { heading: 'Profile', imageUrl: '/dashboard/profile.svg', link: '/dashboard/mom/profile' },
  ],
  admin: [
    { heading: 'Dashboard', imageUrl: '/dashboard/home.svg', link: '/dashboard/admin/overview' },
    { heading: 'Pending Requests', imageUrl: '/dashboard/calendar.svg', link: '/dashboard/admin/pending-requests' },
    { heading: 'Earnings', imageUrl: '/dashboard/earnings.svg', link: '/dashboard/admin/earnings' },
    { heading: 'Messages', imageUrl: '/dashboard/message.svg', link: '/dashboard/admin/messages' },
    { heading: 'Monitoring', imageUrl: '/dashboard/monitoring.svg', link: '/dashboard/admin/monitoring' },
  ],
  momHelper: [
    { heading: 'Dashboard', imageUrl: '/dashboard/home.svg', link: '/dashboard' },
    { heading: 'Order Management', imageUrl: '/dashboard/calendar.svg', link: '/dashboard/order-mgmt' },
    { heading: 'Earnings', imageUrl: '/dashboard/earnings.svg', link: '/dashboard/earnings' },
    { heading: 'Calendar', imageUrl: '/dashboard/earnings.svg', link: '/dashboard/calendar' },
    { heading: 'Messages', imageUrl: '/dashboard/message.svg', link: '/dashboard/messages' },
    { heading: 'Profile', imageUrl: '/dashboard/profile.svg', link: '/dashboard/profile' },
  ],
};

export default function DashBoardNavBar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isNavigationDisabled, setIsNavigationDisabled] = useState(false);
  let role: keyof typeof links = 'momHelper'; 

  if (pathname.includes('/admin')) {
    role = 'admin';
  } else if (pathname.includes('/mom')) {
    role = 'mom';
  } else {
    role = 'momHelper';
  }
  const { data: userProfile } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      if (status === 'authenticated') {
        const response = await axios.get('/api/user/current');

        return response.data;
      }

      return null;
    },
    enabled: status === 'authenticated',
  });

  useEffect(() => {
    if (session?.user?.role === 'HELPER' && userProfile) {
      setIsNavigationDisabled(session.user.role === 'HELPER' && !userProfile.isApproved);
    } else {
      setIsNavigationDisabled(false);
    }
  }, [session, userProfile]);
  const currentLinks = links[role];

  return (
    <DashBoardNav>
      <Link href={`/dashboard/${role === 'momHelper' ? '' : `${role}/overview`}`}>
        <Image src='/logo.svg' alt='FSA Logo' height={58} width={110} />
      </Link>
      <DashBoardOptions>
        {currentLinks.map((link, index) => {
          if (isNavigationDisabled) {
            return (
              <Box key={index} style={{ width: '100%' }}>
                <DisabledNavOption>
                  <Image
                    src={link.imageUrl}
                    alt={link.heading}
                    height={14}
                    width={14}
                  />
                  <DashBoardTypography sx={{ color: 'text.disabled' }}>
                    {link.heading}
                  </DashBoardTypography>
                </DisabledNavOption>
              </Box>
            );
          }

          return (
            <Link href={link.link} key={index} style={{ width: '100%' }}>
              <DashBoardOption>
                <Image
                  src={link.imageUrl}
                  alt={link.heading}
                  height={14}
                  width={14}
                />
                <DashBoardTypography>{link.heading}</DashBoardTypography>
              </DashBoardOption>
            </Link>
          );
        })}
      </DashBoardOptions>
    </DashBoardNav>
  );
}