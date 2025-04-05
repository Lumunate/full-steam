'use client';

import Image from 'next/image';

import { Link } from '@/i18n/routing';

import { DashBoardNav } from './DashBoardNavBar.style';
import { DashBoardOption, DashBoardOptions } from './DashBoardNavBar.style';
import { DashBoardTypography } from './DashBoardNavBar.style';

const links = [
  { heading: 'Dashboard', imageUrl: '/dashboard/home.svg' , link:'/dashboard' },
  { heading: 'Order Management', imageUrl: '/dashboard/calendar.svg' , link:'/dashboard/order-mgmt' },
  { heading: 'Earnings', imageUrl: '/dashboard/earnings.svg' ,  link:'/dashboard/earnings' },
  { heading: 'Messages', imageUrl: '/dashboard/message.svg' , link:'/dashboard/messages' },
  { heading: 'Profile', imageUrl: '/dashboard/profile.svg' , link:'/dashboard/profile'},
];

export default function DashBoardNavBar() {

  return (
    <DashBoardNav>
      <Link href='/dashboard'>
        <Image src='/logo.svg' alt='FSA Logo' height={58} width={110} />
      </Link>
      <DashBoardOptions>
        {links.map((link, index) => (
          <Link href={link?.link} key={index} style={{width: '100%'}} >
            <DashBoardOption >
              <Image
                src={link.imageUrl}
                alt={link.heading}
                height={14}
                width={14}
              />
              <DashBoardTypography>{link.heading}</DashBoardTypography>
            </DashBoardOption>
          </Link>
        ))}
      </DashBoardOptions>
    </DashBoardNav>
  );
}
