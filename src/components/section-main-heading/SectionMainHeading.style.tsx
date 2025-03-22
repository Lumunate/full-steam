'use client';

import { styled, Typography } from '@mui/material';

export const MainHeadingTypography = styled(Typography)(({  color, center, marginbottom}) => ({
  fontSize: '56px',
  fontWeight: 700,
  display: 'flex',
  
  color: color,
  gap: '10px',
  textAlign: center?  'center': 'left',
  marginBottom: marginbottom ? marginbottom :'18px',
  zIndex: 10
}));

export const MainHeadingSpan = styled(Typography)(() => ({
  fontSize: '56px',
  fontWeight: 700,
  
  color: '#1A3375', 
  color: '#193F64', 
  fontFamily: 'Urbanist, sans-serif',
  fontStyle: 'normal',
}));