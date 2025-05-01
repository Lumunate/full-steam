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
} from './UpcommingSessions.style';
const userDetails = {
  userName: 'Bessie Cooper',
  imageSrc: '/dashboard/dashboard-mom/profile-pic/user-img.png',
  userRole: 'Mom',
  date: 'April 04, 2025',
  day: 'Wed',
  timeStart: '10:00',
  timeEnd: '14:00',
};

export default function UpcomingSessions() {
  return (
    <>
      <UpcommingSessionBox>
        <UpcommingSessionHeading>Next Upcoming Session</UpcommingSessionHeading>
        <UpcomingSessionTypography>
          Your next scheduled session with a helper
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
                src='/dashboard/dashboard-mom/calendar-tick.svg'
                alt='calendar-tick'
                width={24}
                height={24}
              />
              <UpcomingSessionDay>
                {userDetails.day}, {userDetails.date}
              </UpcomingSessionDay>
            </TimingBox>
            <UpcomingSessionTime>
              {userDetails.timeStart} - {userDetails.timeEnd}
            </UpcomingSessionTime>
          </UpcomingSessionsTimingsBox>
        </UpcomingSessionBox>
        <ButtonBox>

          <Button width='180px'>View Details</Button>
          <Button width='180px' special>Message Helper</Button>
        </ButtonBox>
      </UpcommingSessionBox>
    </>
  );
}
