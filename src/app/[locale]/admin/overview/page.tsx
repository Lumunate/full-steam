'use client';

import Submissions from '@/features/dashboard/dashboard-admin/overview/submissions/Submission';
import WeeklySumUp from '@/features/dashboard/dashboard-admin/overview/sum-up/WeeklySumUp';

export default function DashBoardAdmin() {
 
  return (
 
    <>
      <WeeklySumUp />
      <Submissions />
    </>
  );
}