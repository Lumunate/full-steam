'use client';

import OrderStats from '@/features/dashboard/dashboard-mom/overview/order-stats/OrderStats';
import RecentOrder from '@/features/dashboard/dashboard-mom/overview/recent-orders/RecentOrders';
import UpcomingSessions from '@/features/dashboard/dashboard-mom/overview/upcoming-sessions/UpcommingSessions';

export default function DashBoardMomOverview() {
  return (
    <>
      <OrderStats />
      <UpcomingSessions />
      <RecentOrder />
    </>);
}
