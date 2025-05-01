'use client';

import { Box, styled, Typography } from '@mui/material';
import Image from 'next/image';
export const AboutSubHeading = styled(Typography)(({theme}) => ({
  fontWeight: 400,
  fontStyle: 'normal',
  fontSize: '40px',
  letterSpacing: '-1px',
  marginBottom: '16px',
  marginTop: '32px',
  [theme.breakpoints.down(1200)]:{
    fontSize: '22px',
    marginTop: '24px',
  }
}));

export const AboutWrapper = styled(Box)({
  width: '100%',
  minHeight: 'calc(100vh + 135px)',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

export const ImpressionGrid = styled(Box)(({theme}) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '12px',
  maxWidth: '900px',
  zIndex: 1,
  [theme.breakpoints.down(1200)]:{
    gridTemplateColumns: 'repeat(1,1fr)'
  }
}));

export const FamilyDogImage = styled(Image)(({theme}) =>({
  position: 'absolute', zIndex: 0, top: '25%', left: '0', 
  [theme.breakpoints.down(1200)]:{
    width: '100%',
    objetFit: 'contain'
  }
}));
