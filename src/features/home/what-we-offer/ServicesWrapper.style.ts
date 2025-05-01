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
  display: 'flex',
  gap: '20px',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap'
});
