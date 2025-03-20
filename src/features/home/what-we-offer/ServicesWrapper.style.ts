'use client';

import { Box, styled } from '@mui/material';

export const ServiceWrapper = styled(Box)({
  width: '100%',
  minHeight: 'calc(100vh + 135px)',
  display: 'flex', 
  flexDirection: 'column',
  alignItems: 'center'
});
export const WhatWeOfferCards = styled(Box)({  

  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '20px',
  justifyItems: 'center',
});