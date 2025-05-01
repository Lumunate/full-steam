'use client';

import { Box, styled } from '@mui/material';

export const HeroWrapper = styled(Box)({
  width: '100%',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const ServiceCardGrid = styled(Box)(({theme}) => ({
  marginTop: '95px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gridTemplateColumns: 'repeat(3,1fr)',
  gap: '20px',
  marginBottom: '140px',
  [theme.breakpoints.down(1200)]:{
    marginTop: '24px',
    marginBottom: '85px'
  }
}));
