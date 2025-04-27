'use client';

import { Box, styled } from '@mui/material';

export const ServiceWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '100px',
  marginBottom: '200px',
});
export const WhatWeOfferCards = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '20px',
  justifyItems: 'center',
});
