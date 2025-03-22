'use client';

import { Button } from '../buttons/Button.style';
import { Link } from '@/i18n/routing';
import { Box, styled, Typography } from '@mui/material';

interface ApplicationSatusProps {
  isApproved: boolean;
  isMom?: boolean;
}

const ApplicationBlock = styled(Box)({
  marginTop: '50px',
});
const ApplicationHeading = styled(Typography)({
  fontSize: '28px',
  fontWeight: 400,
  marginBottom: '16px',
});

const ApplicationStatus = styled(Typography)(({ isApproved }) => ({
  fontSize: '28px',
  fontWeight: 700,
  color: isApproved ? '#28a745' : '#02405F',
}));

const Account = styled(Typography)({
  marginTop: '16px',
  marginBottom: '19px',
});

const ApplicationSatus: React.FC<ImpressionCardProps> = ({
  isApproved = false,
  isMom = false,
}) => {
  return (
    <ApplicationBlock>
      {isMom && <ApplicationHeading>Application Status</ApplicationHeading>}
      {isMom && isApproved ? (
        <ApplicationStatus isApproved >Submitted</ApplicationStatus>
      ) : (
        isMom && <ApplicationStatus>Not Submitted</ApplicationStatus>
      )}
      <Account>
        Already have a{isMom && 'n Mom Helper'} account? Log in to access your
        dashboard.
      </Account>

      <Link
        href={isMom ? '/login?role=mom' : '/login?role=mom-helper'}
        style={{ marginTop: '19px' }}
      >
        <Button padding='9px 59px' width='280px'>
          Login to your Account
        </Button>
      </Link>
    </ApplicationBlock>
  );
};

export default ApplicationSatus;
