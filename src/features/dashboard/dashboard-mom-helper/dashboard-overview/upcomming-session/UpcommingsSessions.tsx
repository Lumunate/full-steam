'use client';

import { Box } from '@mui/material';

import DashboardNotification from '@/components/dashboard-notification/DashboardNotification';
import { DashBoardSectionHeading } from '@/components/dashboard-notification/DashboardNotification.style';
const clientDetails =[
  {name: 'Anderson Family',
    clientImageUrl: '/dashboard/dashboard-overview/notification-profice-pics/anderson.png',
    day: 'Today',
    timeFrom: '2:00 pm',
    timeTo: '6:00 pm',
    buttonAction: 'start-session'
    
  },
  {name: 'Thompson Family',
    clientImageUrl: '/dashboard/dashboard-overview/notification-profice-pics/thompson.png',
    day: 'Tommorow',
    timeFrom: '9:00 am',
    timeTo: '3:00 pm',
    buttonAction: 'view-details'
    
  },
];

export default function UpcommingSessions() {
  return (<>
    <DashBoardSectionHeading>Upcoming Sessions</DashBoardSectionHeading>
    <Box sx={{display: 'flex' , flexDirection: 'column' ,gap: '12px', marginTop: '50px'}}>

      {clientDetails.map((data,index) =>(
        <DashboardNotification key={index} clientName={data.name} clientProfilePic={data.clientImageUrl} sessionDay={data.day} sessionStartTime={data.timeFrom} sessionEndTime={data.timeTo} buttonAction={data.buttonAction} />
      ))}
    </Box>
  </>
    
  );
}
