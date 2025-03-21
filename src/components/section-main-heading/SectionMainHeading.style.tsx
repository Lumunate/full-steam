'use client';

import { styled, Typography } from '@mui/material';

export const MainHeadingTypography = styled(Typography)(({ theme, color}) => ({
  fontSize: '56px',
  fontWeight: 700,
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
  fontStyle: 'normal',
  whiteSpace: 'nowrap',
}));