'use client';

import MomHelperProfiles from '@/features/dashboard/dashboard-mom/profile-view/mom-helper-profiles/MomHelperProfiles';
import PopularService from '@/features/dashboard/dashboard-mom/profile-view/popular-services/PopularServices';
export default function DashBoardAdmin() {

  return (
    <>
      <PopularService />
      <MomHelperProfiles />
    </>
  );
}
