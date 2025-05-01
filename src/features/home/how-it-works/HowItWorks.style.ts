'use client';

import { Box, styled } from '@mui/material';
export const ProcessMain = styled(Box)({
  width: '100%',
  minHeight: 'calc(100vh )',

  background: '#CEEDFF',
});

export const ProcessWrapper = styled(Box)(({theme})=>({
  padding: '118px 0  224px',
  display: 'flex',
  alignItems: 'center',
  gap: '65px',
  [theme.breakpoints.down(1200)]:{
    flexDirection: ' column !important'
  }
}));

export const ProcessWrapperBoxUpper =styled(Box)(({theme}) => ({
  width: '50%' , overflow: 'hidden'
}) );
export const ProcessWrapperBoxLower =styled(Box)(({theme}) => ({
  display: 'flex',
  gap: '20px',
  width: '50%',
  overflow: 'hidden',
  [theme.breakpoints.down(1200)]: {
    width: '100%'
  }
}));