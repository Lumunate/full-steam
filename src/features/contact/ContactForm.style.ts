'use client';

import { Box, ButtonBase, styled } from '@mui/material';

export const ContactFormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#FCFDFF',
  padding: '92px 56px 55px',
  borderRadius: '20px',
  boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)',
  zIndex: 1,
  [theme.breakpoints.down('xl')]: {
    padding: '50px 40px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '40px 30px',
  },
}));

export const ContactButton = styled(ButtonBase)({
  padding: '8px',
  fontWeight: 400,
  fontFamily: 'Lato, sans-serif',
  fontSize: '14px',
  color: 'white',
  backgroundColor: '#DA9694',
  textAlign: 'center',
  border: 'none',
  borderRadius: '4px',
  transition: 'all 0.3s ease-in-out',
  boxShadow: '0 4px 11px rgba(0, 0, 0, 0.1)',
  width: '170px',
  height: '41px',
  marginTop: '41px',
  '&:hover': {
    backgroundColor: '#c0605e',
  },
});
