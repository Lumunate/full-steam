'use client';

import {
  DashBoardNotifcationBox,
  ClientNameBox,
  ClientInfoBox,
  ClientName,
  ClientDetailsBox,
  ClientRelatedTypography,
  ClientRole,
  ClientProfilePic,
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
  submissionDate = ''
}) => {
  return (
    <DashBoardNotifcationBox>
      <ClientInfoBox>
        <ClientProfilePic
          src={clientProfilePic}
          alt={clientName}
          height={40}
          width={40}
        />
        <ClientDetailsBox>
          <ClientNameBox>
            <ClientName>{clientName}</ClientName>
            {role && <ClientRoleTypography>{role}</ClientRoleTypography>}
            {messageTime && (
              <ClientRelatedTypography>{messageTime}</ClientRelatedTypography>
            )}
            {submissionDate && (
              <ClientRelatedTypography sx={{marginTop: '5px'}}>Submitted on {submissionDate}</ClientRelatedTypography>
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
          <ViewDocumentTypography>View Document</ViewDocumentTypography>
        )}
        {buttonAction && (
          <ClientRelatedActionButton buttonAction={buttonAction} width='125px'>
            {buttonAction.replace('-', ' ')}
          </ClientRelatedActionButton>
        )}
      </ButtonGroup>
    </DashBoardNotifcationBox>
  );
};

export default DashboardNotification;
