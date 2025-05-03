'use client';

import { styled, Box, Typography } from '@mui/material';
import Image from 'next/image';

export const StatHolderContainer = styled(Box)(({theme}) => ({
  fontSize: '12px',
  fontWeight: 700,
  height: '75px',
  display: 'flex',
  color: '#1570B8',
  alignItems: 'center',
  background: ' #FFFFFF0D',
  backdropFilter: 'blur(13.800000190734863px)',
  boxShadow: '0px 4px 32.4px 0px #0000001A',
  width: '282px',
  borderRadius: '20px',
  border: '1px solid #FFFFFF1A',
  padding: '12px 20px',
  [theme.breakpoints.down(800)]:{
    height: '36px',
    borderRadius: '10px',
    width: '137px',
    padding: '5px 9px'
  }
}));

export const StatImage = styled(Image)(({theme})=>({

  [theme.breakpoints.down(800)]:{
    width: '24px',
    height: '24px',
  }

}));

export const StatHolderHeading = styled(Typography)(({theme}) => ({
  fontSize: '18px',
  fontFamily: 'Lato, sans-serif',
  fontWeight: 500,
  margin: 0,
  [theme.breakpoints.down(800)]:{
    fontSize: '9px'
  }
}));
export const StatHolderPara = styled(Typography)(({theme}) => ({
  fontSize: '14px',
  fontFamily: 'Lato, sans-serif',
  fontWeight: 400,
  margin: 0,
  [theme.breakpoints.down(800)]:{
    fontSize: '7px'
  }
}));
