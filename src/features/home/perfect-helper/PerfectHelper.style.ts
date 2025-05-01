'use client';

import { Box, styled, Typography } from '@mui/material';
export const PerfectHelperWrapper = styled(Box)(({theme}) =>({
  background: `url('/home/perfect-helper/perfect-helper.png')`,
  backgroundPosition: 'center',
  width: '100%',
  minHeight: 'calc(80vh)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  position: 'relative',
  [theme.breakpoints.down(1200)]:{
    minHeight: 'calc(100vh)'
  }
}));
export const PerfectHelperOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background:
    'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),linear-gradient(84.75deg, #37B5FF 0.22%, rgba(0, 0, 0, 0) 99.77%)',
  zIndex: 1,
});

export const ContentWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '117px',
});

export const HelperTypography = styled(Typography)(({theme}) =>({
  fontSize: '18px',
  color: '#fff',
  textAlign: 'center',
  [theme.breakpoints.down(1200)]:{
    fontSize: '12px',
  }
}));

export const PerfectHelperButtonsBox = styled(Box)(({theme})=>({

  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
  justifyContent: 'center',
  marginTop: '10px',
  [theme.breakpoints.down(1200)]:{
    flexDirection: 'column'
  }
}));

export const PerfectHelperBoxButton = styled(Box)(({theme}) => ({
  display: 'flex', flexDirection: 'column', gap: '10px' ,
  alignItems: 'center'
}));

export const ColumnBox = styled(Box)(({theme}) => ({
  display: 'flex',
  [theme.breakpoints.down(1200)]:{
    flexDirection: 'column'
  }
}));