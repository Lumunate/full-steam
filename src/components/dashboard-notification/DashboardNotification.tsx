'use client';

import { Avatar } from '@mui/material';
import Image from 'next/image';

import {
  DashBoardNotifcationBox,
  ClientNameBox,
  ClientInfoBox,
  ClientName,
  ClientDetailsBox,
  ClientRelatedTypography,
  ClientRole,
  ClientRelatedActionButton,
  ClientRoleTypography,
  ViewDocumentTypography,
  ButtonGroup
} from './DashboardNotification.style';

interface DashBoardNotificationProps {
  clientName: string;
  clientProfilePic: string;
  sessionDay?: string;
  sessionStartTime?: string;
  sessionEndTime?: string;
  buttonAction?: string;
  message?: string;
  messageTime?: string;
  submissionTime?: string;
  viewDocument?: boolean;
  role?: string;
  submissionDate?: string;
  onButtonClick?: () => void;
  onViewDocumentClick?: () => void;
}

const DashboardNotification: React.FC<DashBoardNotificationProps> = ({
  clientName,
  clientProfilePic,
  sessionDay = '',
  sessionStartTime = '',
  sessionEndTime = '',
  buttonAction = '',
  message = '',
  messageTime = '',
  submissionTime = '',
  viewDocument = false,
  role = '',
  submissionDate = '',
  onButtonClick,
  onViewDocumentClick
}) => {
  // Determine if the image URL is from Cloudinary
  const isCloudinaryUrl = clientProfilePic.includes('res.cloudinary.com');

  return (
    <DashBoardNotifcationBox>
      <ClientInfoBox>
        {isCloudinaryUrl ? (
          <Avatar
            src={clientProfilePic}
            alt={clientName}
            sx={{ width: 40, height: 40 }}
          />
        ) : (
          <Image
            src={clientProfilePic}
            alt={clientName}
            height={40}
            width={40}
            style={{ borderRadius: '50%', objectFit: 'cover' }}
          />
        )}
        <ClientDetailsBox>
          <ClientNameBox>
            <ClientName>{clientName}</ClientName>
            {role && <ClientRoleTypography>{role}</ClientRoleTypography>}
            {messageTime && (
              <ClientRelatedTypography>{messageTime}</ClientRelatedTypography>
            )}
            {submissionDate && (
              <ClientRelatedTypography sx={{marginTop: '5px'}}>
                Submitted on {submissionDate}
              </ClientRelatedTypography>
            )}
          </ClientNameBox>
          <ClientRole></ClientRole>
          <ClientRelatedTypography>
            {submissionTime && `Submitted on ${submissionTime}`}
            {message}
            {sessionDay &&
              sessionEndTime &&
              sessionStartTime &&
              `${sessionDay}, ${sessionStartTime.toUpperCase()}-${sessionEndTime.toUpperCase()}`}
          </ClientRelatedTypography>
        </ClientDetailsBox>
      </ClientInfoBox>
      <ButtonGroup>
        {viewDocument && (
          <ViewDocumentTypography onClick={onViewDocumentClick}>
            View Document
          </ViewDocumentTypography>
        )}
        {buttonAction && (
          <ClientRelatedActionButton 
            buttonAction={buttonAction} 
            width='125px'
            onClick={onButtonClick}
          >
            {buttonAction.replace('-', ' ')}
          </ClientRelatedActionButton>
        )}
      </ButtonGroup>
    </DashBoardNotifcationBox>
  );
};

export default DashboardNotification;