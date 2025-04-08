'use client';

import { useState } from 'react';

import AnalysticsSection from '@/features/dashboard/dashboard-mom-helper/dashboard-overview/analysics/Analystics';
import FirstOverview from '@/features/dashboard/dashboard-mom-helper/dashboard-overview/first-overview/FirstOverview';
import RecentMessgaes from '@/features/dashboard/dashboard-mom-helper/dashboard-overview/recent messages/RecentMessages';
import UpcommingSessions from '@/features/dashboard/dashboard-mom-helper/dashboard-overview/upcomming-session/UpcommingsSessions';

export default function DashBoardAdmin() {

  const [dashboardOverview , setDashboardOverview] = useState(true);

  const handleButtonClick = () => {
    setDashboardOverview(false);
  };

  return (
    <>
      {dashboardOverview && 
      <FirstOverview onButtonClick={handleButtonClick} />
      }
      {!dashboardOverview && 
      <>
        <AnalysticsSection />
        <UpcommingSessions />
        <RecentMessgaes />
      </>
      }
    </>
  );
}
