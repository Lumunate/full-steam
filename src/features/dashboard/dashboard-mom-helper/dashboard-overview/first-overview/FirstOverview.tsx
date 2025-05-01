'use client';
import { Box, CircularProgress, Tooltip } from '@mui/material';

import { Button } from '@/components/buttons/Button.style';
import DashboardNotification from '@/components/dashboard-notification/DashboardNotification';
import { DashBoardSectionHeading } from '@/components/dashboard-notification/DashboardNotification.style';
import { useCurrentUser } from '@/hooks/useCurrentUser';

interface FirstOverviewProps {
  onButtonClick: () => void;
}

export default function FirstOverview({ onButtonClick }: FirstOverviewProps) {
  const { user, isLoading, error, role } = useCurrentUser();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !user) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <DashBoardSectionHeading>
          Error loading your profile. Please try again later.
        </DashBoardSectionHeading>
      </Box>
    );
  }

  const formatDate = (date: string | Date) => {
    if (!date) return 'N/A';
    const d = new Date(date);

    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear().toString().substring(2)}`;
  };

  const submissionTime = formatDate(user.createdAt || new Date());
  const buttonAction = user.isApproved ? 'approved' : 'pending';
  
  const isButtonDisabled = role === 'HELPER' && !user.isApproved;
  
  const clientImageUrl = user.image && user.image.trim() !== '' 
    ? user.image 
    : '/dashboard/dashboard-overview/notification-profice-pics/anderson.png';
    
  const clientDetails = [{
    name: `${user.firstName} ${user.lastName}`,
    clientImageUrl: clientImageUrl,
    submissionTime: submissionTime,
    buttonAction: buttonAction
  }];

  return (
    <Box sx={{ height: '75vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Box>
        <DashBoardSectionHeading>Application Status</DashBoardSectionHeading>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '50px' }}>
          {clientDetails.map((data, index) => (
            <DashboardNotification 
              key={index} 
              submissionTime={data.submissionTime} 
              clientName={data.name} 
              clientProfilePic={data.clientImageUrl} 
              buttonAction={data.buttonAction} 
            />
          ))}
        </Box>
      </Box>
      
      {isButtonDisabled ? (
        <Tooltip title="Your profile needs to be approved before you can proceed" arrow>
          <span style={{ alignSelf: 'flex-end' }}>
            <Button 
              disabled={true}
              width='250px' 
              sx={{ 
                alignSelf: 'flex-end',
                opacity: 0.7,
                cursor: 'not-allowed',
                '&:hover': {
                  backgroundColor: '#fffbfb',
                  cursor: 'not-allowed'
                }
              }}
            >
              Waiting For Approval
            </Button>
          </span>
        </Tooltip>
      ) : (
        <Button 
          onClick={onButtonClick} 
          special={buttonAction === 'approved'} 
          width='250px' 
          sx={{ alignSelf: 'flex-end' }}
        >
          {buttonAction === 'approved' ? 'Proceed' : 'Pending Approval'}
        </Button>
      )}
    </Box>
  );
}