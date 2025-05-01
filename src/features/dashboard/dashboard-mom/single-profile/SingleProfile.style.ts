'use client';

import { Box, styled, Typography } from '@mui/material';

export const SingleProfileContainer = styled(Box)({
  display: 'flex',
  gap: '20px',

});

export const SingleProfileDetailsContainer = styled(Box)({});

export const DetailsBox = styled(Box)({
  border: '1px solid #7E8289',
  borderRadius: '20px',
  padding: '32px'
});

export const DetailsHeading = styled(Typography)({

  fontSize: '22px',
  color: '#000000',

});

export const DetailsIntro = styled(Typography)({
  fontSize: '22px',
  color: '#747474'
});