
import AnalysticsSection from '@/features/dashboard/dashboard-mom-helper/dashboard-overview/analysics/Analystics';
import RecentMessgaes from '@/features/dashboard/dashboard-mom-helper/dashboard-overview/recent messages/RecentMessages';
import UpcommingSessions from '@/features/dashboard/dashboard-mom-helper/dashboard-overview/upcomming-session/UpcommingsSessions';
export default function DashBoardAdmin() {
  return (
    <>

      <AnalysticsSection />
      <UpcommingSessions />
      <RecentMessgaes />
    </>
  );
}
