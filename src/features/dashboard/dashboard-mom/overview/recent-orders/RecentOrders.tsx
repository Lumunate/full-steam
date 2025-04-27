'use client';

import Image from 'next/image';

import { Button } from '@/components/buttons/Button.style';
import ProfileAndRole from '@/features/components/dashboard/dashboard-mom/ProfileAndRole';

import {
  UpcommingSessionBox,
  UpcommingSessionHeading,
  UpcomingSessionTypography,
  UpcomingSessionBox,
  UpcomingSessionsTimingsBox,
  UpcomingSessionDay,
  TimingBox,
  UpcomingSessionTime,
  ButtonBox,
} from './RecentOrders.style';

const userDetails = {
  userName: 'Bessie Cooper',
  imageSrc: '/dashboard/dashboard-mom/profile-pic/user-img.png',
  userRole: 'Mom',
  date: 'April 04, 2025',
  day: 'Wed',
  timeStart: '10:00',
  timeEnd: '14:00',
  status: 'Upcoming',
};

export default function RecentOrder() {
  return (
    <>
      <UpcommingSessionBox>
        <UpcommingSessionHeading>Recent Orders</UpcommingSessionHeading>
        <UpcomingSessionTypography>Manage your recent orders and sessions
        </UpcomingSessionTypography>
        <UpcomingSessionBox>
          <ProfileAndRole
            imageSrc={userDetails.imageSrc}
            userRole={userDetails.userRole}
            userName={userDetails.userName}
          />
          <UpcomingSessionsTimingsBox>
            <TimingBox>
              <Image
                src={userDetails.status === 'Upcoming' ? '/dashboard/dashboard-mom/calendar-tick-blue.svg' : '/dashboard/dashboard-mom/calendar-tick.svg'}
                alt='calendar-tick'
                width={24}
                height={24}
              />
              <UpcomingSessionDay>
                Upcoming
              </UpcomingSessionDay>
            </TimingBox>
            <UpcomingSessionTime>
              {userDetails.day}, {userDetails.date}
            </UpcomingSessionTime>
            <UpcomingSessionTime>
              {userDetails.timeStart} - {userDetails.timeEnd}
            </UpcomingSessionTime>
          </UpcomingSessionsTimingsBox>
          <Button width='117px'>View Details</Button>
        </UpcomingSessionBox>
       
      </UpcommingSessionBox>
    </>
  );
}
