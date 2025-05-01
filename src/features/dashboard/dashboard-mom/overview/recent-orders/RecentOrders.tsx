'use client';

import { Box } from '@mui/material';
import Image from 'next/image';
import { useQueryState } from 'nuqs';

import { Button } from '@/components/buttons/Button.style';
import { StyledRadio } from '@/components/form/Froms.style';
import ProfileAndRole from '@/features/components/dashboard/dashboard-mom/ProfileAndRole';

import { StyledLabelSession } from './RecentOrders.style';
import { RadioContainer } from './RecentOrders.style';
import {
  UpcommingSessionBox,
  UpcommingSessionHeading,
  UpcomingSessionTypography,
  UpcomingSessionBox,
  UpcomingSessionsTimingsBox,
  UpcomingSessionDay,
  TimingBox,
  UpcomingSessionTime,
} from './RecentOrders.style';

const userDetails = [

  {
    userName: 'Bessie Cooper',
    imageSrc: '/dashboard/dashboard-mom/profile-pic/user-img.png',
    userRole: 'Tutoring, Meal Preparation',
    date: 'April 04, 2025',
    day: 'Wed',
    timeStart: '10:00',
    timeEnd: '14:00',
    status: 'Canceled',
    serviceType: 'package'
  },
  {
    userName: 'Gustavo',
    imageSrc: '/dashboard/dashboard-mom/profile-pic/user-img.png',
    userRole: 'Mom',
    date: 'April 04, 2025',
    day: 'Wed',
    timeStart: '12:00',
    timeEnd: '16:00',
    status: 'Completed',
    serviceType: 'package'
  },
  {
    userName: 'Adrian Black',
    imageSrc: '/dashboard/dashboard-mom/profile-pic/user-img.png',
    userRole: 'Weekend Boost',
    date: 'April 04, 2025',
    day: 'Wed',
    timeStart: '10:00',
    timeEnd: '14:00',
    status: 'Completed',
    serviceType: 'package'
  },
  {
    userName: 'Frank Garcia',
    imageSrc: '/dashboard/dashboard-mom/profile-pic/user-img.png',
    userRole: 'After School Specialist',
    date: 'April 04, 2025',
    day: 'Wed',
    timeStart: '10:00',
    timeEnd: '14:00',
    status: 'Upcoming',
    serviceType: 'service'
  },
]

;

export default function RecentOrder() {
  const [value, setValue] = useQueryState('role', { defaultValue: 'upcoming' });

  return (
    <>
      <UpcommingSessionBox>
        <UpcommingSessionHeading>Recent Orders</UpcommingSessionHeading>
        <UpcomingSessionTypography>Manage your recent orders and sessions
        </UpcomingSessionTypography>
        <RadioContainer value={value} onChange={e => setValue(e.target.value)}>
          <StyledLabelSession
            value='upcoming'
            control={<StyledRadio />}
            label='Upcoming'
            isselected={value === 'upcoming'}
          />
          <StyledLabelSession
            value='completed'
            control={<StyledRadio />}
            label='Completed'
            isselected={value === 'completed'}
          />
          <StyledLabelSession
            value='canceled'
            control={<StyledRadio />}
            label='Canceled'
            isselected={value === 'canceled'}
          />
        </RadioContainer>
        <Box>
          {userDetails
            .filter(userDetail => value === userDetail.status.toLowerCase())
            .map((userDetail, index) => (
              <UpcomingSessionBox key={index}>
                <ProfileAndRole
                  imageSrc={userDetail.imageSrc}
                  userRole={userDetail.userRole}
                  userName={userDetail.userName}
                  serviceType={userDetail.serviceType}
                />
                <UpcomingSessionsTimingsBox>
                  <TimingBox>
                    <Image
                      src={
                        userDetail.status === 'Upcoming'
                          ? '/dashboard/dashboard-mom/calendar-tick-blue.svg'
                          : userDetail.status === 'Completed'
                            ? '/dashboard/dashboard-mom/tick-circle.svg'
                            : '/dashboard/dashboard-mom/close-circle.svg'
                      }
                      alt="calendar-tick"
                      width={24}
                      height={24}
                    />
                    <UpcomingSessionDay>
                      {userDetail.status}
                    </UpcomingSessionDay>
                  </TimingBox>
                  <UpcomingSessionTime>
                    {userDetail.day}, {userDetail.date}
                  </UpcomingSessionTime>
                  <UpcomingSessionTime>
                    {userDetail.timeStart} - {userDetail.timeEnd}
                  </UpcomingSessionTime>
                </UpcomingSessionsTimingsBox>
                <Button width="117px">View Details</Button>
              </UpcomingSessionBox>
            ))}
         
        </Box>
       
      </UpcommingSessionBox>
    </>
  );
}
