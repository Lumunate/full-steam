'use client';

import { styled, Typography } from '@mui/material';

export const MainHeadingTypography = styled(Typography)(({ theme, color}) => ({
  fontSize: '56px',
  fontWeight: 700,
  fontFamily: 'Urbanist, sans-serif',
  display: 'flex',
  color: color,
  alignItems: 'center',
  gap: '10px',
  whiteSpace: 'nowrap',
}));

export const MainHeadingSpan = styled(Typography)(({ theme }) => ({
  fontSize: '56px',
  fontWeight: 700,
  
  color: '#1A3375', 
  fontFamily: 'Urbanist, sans-serif',
  fontStyle: 'normal',
  whiteSpace: 'nowrap',
}));