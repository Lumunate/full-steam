'use client';

import { Box, styled, Typography } from '@mui/material';
import Image from 'next/image';
export const ImpressionCardContainer = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '12px',
  borderRadius: '32px',
  boxShadow: '0px 4px 10.6px 0px #0000001F',
  padding: '32px',
  maxWidth: '900px',
  background: '#FFFFFF',
  zIndex: 10,
  [theme.breakpoints.down(1200)]:{
    padding: '0 32px '
  }
}));

export const ImpressionCardText = styled(Typography)(({theme}) => ({
  fontSize: '22px',
  letterSpacing: '-1px',
  fontWeight: 400,
  [theme.breakpoints.down(1200)]:{
    fontSize: '14px'
  }
}));

export const ImpressionImage = styled(Image)(({theme}) => ({
  [theme.breakpoints.down(1200)]:{
    width: '76px',
    height: '76px',
  }
}));