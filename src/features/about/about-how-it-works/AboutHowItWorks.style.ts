'use client';

import { Box, styled, Typography } from '@mui/material';
import Image from 'next/image';
export const HowItWorksBox = styled(Box)(({theme}) =>({
  position: 'relative',
  [theme.breakpoints.down(1200)]:{
    display: 'flex',
    flexDirection: 'column-reverse'
  }
}));

export const AboutSubHeading = styled(Typography)(({theme}) =>({
  fontWeight: 700,
  fontStyle: 'normal',
  fontSize: '28px',
  letterSpacing: '-1px',
  marginBottom: '16px',
  marginTop: '32px',
  [theme.breakpoints.down(1200)]:{
    fontSize: '22px',
    marginTop: '12px',
  }
}));

export const AboutWrapper = styled(Box)({
  width: '100%',
  minHeight: 'calc(100vh + 335px)',
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
  [theme.breakpoints.down(900)]:{
    gridTemplateColumns: 'repeat(1, 1fr)'
  }
}));

export const ParentsImage = styled(Image)(({theme}) =>({
  position: 'absolute', zIndex: 0, top: '0', right: '0' ,
  [theme.breakpoints.down(1200)]:{
    width: '100%',
    objectFit: 'contain',
    position: 'static',
    height: 'auto'
  }
}));