'use client';
import { Box, styled, Typography } from '@mui/material';

export const LegalPageContainer = styled(Box)({
  maxWidth: '1200px',
  margin: '200px auto',
});

export const LegalMainSubHeading = styled(Typography)({

  fontSize: '14px',
  color:'#005782',
  textAlign: 'center',
  fontWeight: 700
});
export const LegalMainHeading = styled(Typography)({
  fontSize: '32px',
  marginBottom: '40px',
  color:'#005782',
  fontWeight: 700,
  lineHeight: '100%',
  textAlign: 'center'
});

export const LegalPageSubHeading = styled(Typography)({
  fontSize: ' 14px',
  fontWeight: 700,
  marginBottom: '8px',
  lineHeight: '150%',
  marginTop: '24px'
});

export const LegalPageTypography = styled(Typography)({
  fontSize: ' 14px',
  fontWeight: 400,
  marginBottom: '8px',
  lineHeight: '150%'

});
