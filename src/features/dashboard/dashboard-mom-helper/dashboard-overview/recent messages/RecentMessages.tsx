'use client';

import { Box } from '@mui/material';

import DashboardNotification from '@/components/dashboard-notification/DashboardNotification';
import { DashBoardSectionHeading } from '@/components/dashboard-notification/DashboardNotification.style';
const clientDetails =[
  {name: 'Anderson Family',
    clientImageUrl: '/dashboard/dashboard-overview/notification-profice-pics/anderson.png',
    messageTime: '2 hours ago',
    message: 'Thank you for taking such good care of Tommy yesterday. He cant wait for your next visit!'
    
  },
  {name: 'Thompson Family',
    clientImageUrl: '/dashboard/dashboard-overview/notification-profice-pics/thompson.png',
    
    messageTime: 'yesterday',
    message: 'Could we schedule an extra session next week? The kids really enjoy spending time with you.'
    
  },
];

export default function RecentMessgaes() {
  return (<>
    <DashBoardSectionHeading>Recent Messages</DashBoardSectionHeading>
    <Box sx={{display: 'flex' , flexDirection: 'column' ,gap: '12px', marginTop: '50px'}}>

      {clientDetails.map((data,index) =>(
        <DashboardNotification key={index} message={data.message} messageTime={data.messageTime} clientName={data.name} clientProfilePic={data.clientImageUrl}  />
      ))}
    </Box>
  </>
    
  );
}
