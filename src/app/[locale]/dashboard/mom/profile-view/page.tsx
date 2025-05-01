'use client';

import { Box, Typography } from '@mui/material';

import MomHelperProfiles from '@/features/dashboard/dashboard-mom/profile-view/mom-helper-profiles/MomHelperProfiles';
import PopularService from '@/features/dashboard/dashboard-mom/profile-view/popular-services/PopularServices';

export default function MomProfileView() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h1" sx={{ mb: 1 }}>
          Mom Helper Profiles
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Find and connect with verified Mom Helpers based on your needs
        </Typography>
      </Box>
      
      <PopularService />
      <Box sx={{ mt: 4 }}>
        <MomHelperProfiles />
      </Box>
    </>
  );
}