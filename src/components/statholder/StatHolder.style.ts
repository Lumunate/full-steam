'use client';

import { styled, Box, Typography } from '@mui/material';

export const StatHolderContainer = styled(Box)(() => ({
  fontSize: '12px',
  fontWeight: 700,
  height: '75px',
  fontFamily: 'Urbanist, sans-serif',
  display: 'flex',
  color: '#1570B8',
  alignItems: 'center',
  background: ' #FFFFFF0D',
  boxShadow: '0px 4px 32.4px 0px #0000001A',
  width: '282px',
  borderRadius: '20px',
  border: '1px solid #FFFFFF1A',
  padding: '12px 20px',
}));

export const StatHolderHeading = styled(Typography)(() => ({
  fontSize: '18px',
  fontFamily: 'Lato, sans-serif',
  fontWeight: 500,
  margin: 0
  
}));
export const StatHolderPara = styled(Typography)(() => ({
  fontSize: '14px',
  fontFamily: 'Lato, sans-serif',
  fontWeight: 400,
  margin: 0
    
}));