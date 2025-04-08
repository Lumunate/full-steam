'use client';

import { Link } from '@/i18n/routing';

import {
  ApplicationBlock,
  ApplicationHeading,
  ApplicationStatus,
  Account,
} from './ApplicationStatus.style';
import { Button } from '../buttons/Button.style';

interface ApplicationSatusProps {
  isApproved?: boolean;
  isMom?: boolean;
}

const ApplicationSatus: React.FC<ApplicationSatusProps> = ({
  isApproved = false,
  isMom = false,
}) => {
  return (
    <ApplicationBlock>
      {!isMom && <ApplicationHeading>Application Status</ApplicationHeading>}
      {!isMom && isApproved ? (
        <ApplicationStatus isApproved>Submitted</ApplicationStatus>
      ) : (
        !isMom && <ApplicationStatus>Not Submitted</ApplicationStatus>
      )}
      <Account>
        Already have a{!isMom && ' Mom Helper'} account? Log in to access your
        dashboard.
      </Account>

      <Link
        href={!isMom ? '/login?role=mom-helper' : '/login?role=mom'}
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
