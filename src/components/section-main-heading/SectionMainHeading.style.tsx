'use client';

import { styled, Typography } from '@mui/material';

export const MainHeadingTypography = styled(Typography)<{
  center?: boolean;
  marginbottom?: string;
}>(({ color, center, marginbottom , theme}) => ({
  fontSize: '56px',
  fontWeight: 700,
  display: 'inline-block',

  color: color,
  textAlign: center ? 'center' : 'left',
  marginBottom: marginbottom ? marginbottom : '18px',
  zIndex: 10,
  lineHeight: '100%',
  [theme.breakpoints.down(1200)]: {
    fontSize: '22px'
  },
}));

export const MainHeadingSpan = styled(Typography)(({ theme }) => ({
  fontSize: '56px',
  fontWeight: 700,
  lineHeight: '100%',
  color: '#1A3375',
  fontFamily: 'Urbanist, sans-serif',
  fontStyle: 'normal',
  [theme.breakpoints.down(1200)]: {
    fontSize: '22px'
  },
}));
