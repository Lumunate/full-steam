'use client';

import { Box, styled, Typography } from '@mui/material';

export const ProcessCardContainer = styled(Box)({
  backgroundColor: '#fff',
  padding: '96px 37px',
  borderRadius: '44px',
  minWidth: '515px',
});

export const ProcessCardNumber = styled(Typography)({

  fontSize: '117px',
  background: 'linear-gradient(180deg, #37B5FF 0%, #62C5FF 44%, #FFFFFF 100%)',
  WebkitBackgroundClip: 'text',
  color: 'transparent'

});
export const ProcessCardHeading = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  color: '#000',
  fontSize: '22px',
  fontWeight: 600,
  gap: '6px',
});
export const ProcessCardDescription = styled(Box)({
  
  color: '#000',
  fontSize: '16px',
  fontWeight: 400,
  marginTop: '12px'
});