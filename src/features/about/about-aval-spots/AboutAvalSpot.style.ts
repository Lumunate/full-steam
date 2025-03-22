'use client';

import { Box,  styled, Typography } from '@mui/material';

export const AboutSubHeading = styled(Typography)({
  fontWeight: 400,
  fontStyle: 'normal',
  fontSize: '40px',
  letterSpacing: '-1px',
  marginBottom: '16px',
  marginTop: '64px'
});

export const AboutWrapper = styled(Box)({
  width: '100%',
  minHeight: 'calc(100vh + 135px)',
  position: 'relative',
  display: 'flex', 
  alignItems: 'center',
});

export const ImpressionGrid =styled(Box)({

  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '12px',
  maxWidth: '900px',
  zIndex: 1
});