'use client';

import { DashBoardNotifcationBox , ClientNameBox,ClientInfoBox, ClientName ,ClientDetailsBox ,ClientRelatedTypography ,ClientRole , ClientProfilePic ,ClientRelatedActionButton  } from './DashboardNotification.style';

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
}

const DashboardNotification: React.FC<DashBoardNotificationProps> = ({
  clientName,
  clientProfilePic,
  sessionDay = '',
  sessionStartTime = '',
  sessionEndTime = '',
  buttonAction = '',
  message ='',
  messageTime = '',
  submissionTime =''
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
            <ClientRelatedTypography>
              {messageTime}
            </ClientRelatedTypography>
          </ClientNameBox>
          <ClientRole>
          </ClientRole>
          <ClientRelatedTypography>
            {submissionTime && `Submitted on ${submissionTime}`}
            {message}
            {sessionDay && sessionEndTime && sessionStartTime && `${sessionDay}, ${sessionStartTime.toUpperCase()}-${sessionEndTime.toUpperCase()}`}
          </ClientRelatedTypography>
        </ClientDetailsBox>
      </ClientInfoBox>

      {buttonAction && (
        <ClientRelatedActionButton buttonAction={buttonAction} width="125px">
          {buttonAction.replace('-', ' ')}
        </ClientRelatedActionButton>
      )}
    </DashBoardNotifcationBox>

  );
};

export default DashboardNotification;
