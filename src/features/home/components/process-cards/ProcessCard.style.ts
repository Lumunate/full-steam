'use client';

import { Padding } from '@mui/icons-material';
import { Box, styled, Typography } from '@mui/material';
import Image from 'next/image';
export const ProcessCardContainer = styled(Box)(({theme})=>({
  backgroundColor: '#fff',
  padding: '96px 37px',
  borderRadius: '44px',
  maxWidth: '515px',
  [theme.breakpoints.down(900)]:{
    padding: '58px 22px', 
  }

}));

export const ProcessCardNumber = styled(Typography)(({theme}) => ({
  fontSize: '117px',
  background: 'linear-gradient(180deg, #37B5FF 0%, #62C5FF 44%, #FFFFFF 100%)',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  [theme.breakpoints.down(900)]: {
    fontSize: '70px'
  }
}));
export const ProcessCardHeading = styled(Typography)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  color: '#000',
  fontSize: '22px',
  fontWeight: 600,
  gap: '6px',
  [theme.breakpoints.down(900)]:{
    fontSize: '14px'
  }
}));
export const ProcessCardDescription = styled(Box)(({theme}) =>({
  color: '#000',
  fontSize: '16px',
  fontWeight: 400,
  marginTop: '12px',
  [theme.breakpoints.down(900)]: {
    fontSize: '10px'
  }
}));

export const ProcessImage = styled(Image)(({theme}) => ({
  [theme.breakpoints.down(900)]:{
    width: '30px',
    height: '30px',
  }
}));