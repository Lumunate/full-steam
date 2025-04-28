import DashboardNotification from '@/components/dashboard-notification/DashboardNotification';

import { SubmissionsBox } from './Submissions.style';
const submissions = [
  {
    name: 'Sarah Wilson',
    clientImageUrl:
      '/dashboard/dashboard-overview/notification-profice-pics/anderson.png',
    buttonAction: 'approved',
    role: 'Mom Helper',
    submissionDate: '11/03/25',
  },
  {
    name: 'Sarah Wilson',
    clientImageUrl:
      '/dashboard/dashboard-overview/notification-profice-pics/anderson.png',
    buttonAction: 'pending',
    role: 'Mom Helper',
    submissionDate: '11/03/25',
  },
];

export default function Submissions() {
  return (
    <>
      <SubmissionsBox>
        {submissions.map((data, index) => (
          <DashboardNotification
            key={index}
            role={data.role}
            clientName={data.name}
            clientProfilePic={data.clientImageUrl}
            submissionDate={data.submissionDate}
            buttonAction={data.buttonAction}
            viewDocument={true}
          />
        ))}
      </SubmissionsBox>
    </>
  );
}
