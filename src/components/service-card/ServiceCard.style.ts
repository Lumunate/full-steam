'use client';


import { styled, Box, Typography } from '@mui/material';

export const CardContainer = styled(Box)(({background}) => ({

  background: background,
  borderRadius: '16px',
  padding: '48px 41px 51px 27px',
  display: 'flex',
  height: '393px',
  width: '340px',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',

}));
export const CardHeading = styled(Typography)(() => ({
  fontSize: '33px',
  fontWeight: 600,
  color: '#005782',
  textWrap: 'nowrap'
}));
export const CardDescription = styled(Typography)(() => ({
  fontSize: '16px',
  fontWeight: 400,
  color: '#005782',
  textTransform: 'capitalize',

}));

export const CardImageContainer = styled(Box)(() => ({

  position: 'absolute',
  bottom: '0',
  right: '0',
}));

export const CardContent = styled(Box)(() => ({}));