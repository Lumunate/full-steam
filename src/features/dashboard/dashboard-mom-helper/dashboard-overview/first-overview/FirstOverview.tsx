'use client';

import { Box } from '@mui/material';

import { Button } from '@/components/buttons/Button.style';
import DashboardNotification from '@/components/dashboard-notification/DashboardNotification';
import { DashBoardSectionHeading } from '@/components/dashboard-notification/DashboardNotification.style';

const clientDetails =[
  {name: 'Anderson Family',
    clientImageUrl: '/dashboard/dashboard-overview/notification-profice-pics/anderson.png',
    submissionTime: '12/03/25',
    buttonAction: 'approved'
    
  },
  {name: 'Anderson Family',
    clientImageUrl: '/dashboard/dashboard-overview/notification-profice-pics/anderson.png',
    submissionTime: '18/02/22',
    
    buttonAction: 'pending'
    
  },
  {name: 'Anderson Family',
    clientImageUrl: '/dashboard/dashboard-overview/notification-profice-pics/anderson.png',
    submissionTime: '18/04/25',
   
    buttonAction: 'rejected'
    
  },
 
];

interface FirstOverviewProps {
  onButtonClick: () => void;
}

export default function FirstOverview({ onButtonClick }: FirstOverviewProps) {
  return (<Box sx={{height: '75vh' , display: 'flex', flexDirection: 'column' , justifyContent: 'space-between' }}>
    <Box>

      <DashBoardSectionHeading>Application Status</DashBoardSectionHeading>
      <Box sx={{display: 'flex' , flexDirection: 'column' ,gap: '12px', marginTop: '50px' }}>

        {clientDetails.map((data,index) =>(
          <DashboardNotification key={index} submissionTime={data.submissionTime} clientName={data.name} clientProfilePic={data.clientImageUrl} buttonAction={data.buttonAction} />
        ))}
      </Box>
    </Box>

    <Button onClick={onButtonClick} special width='250px' sx={{alignSelf: 'flex-end'}}  >
        Proceed
    </Button>
  </Box>
    
  );
}
