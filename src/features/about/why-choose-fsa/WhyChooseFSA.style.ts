'use client';

import { Box, styled } from '@mui/material';

export const HeroWrapper = styled(Box)({
  width: '100%',
  minHeight: 'calc(100vh + 135px)',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const ServiceCardGrid = styled(Box)({
  marginTop: '95px',

  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  gap: '20px',
});
