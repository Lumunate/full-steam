'use client';

import {
  Box,
  styled,
  Typography
} from '@mui/material';

export const FeedbackContainer = styled(Box)(({ theme }) => ({
  padding: '150px 0 100px',
  textAlign: 'center',
  minHeight: 'calc(100vh - 109px)',
  display: 'flex', 
  flexDirection: 'column', 
  justifyContent: 'center',
  [theme.breakpoints.down('lg')]: {
    padding: '150px 0 80px',
  },
  [theme.breakpoints.down('md')]: {
    padding: '150px 0 60px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '120px 0 40px',
  },
}));
export const FeedbackIconHead = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '-38px',
  top: '100px',
  [theme.breakpoints.down('lg')]: {
    left: '0px',
    top: '50px',
  },
}));

export const FeedbackHeadingTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontFamily: 'Jost, sans-serif',
  color: '#1F1F1F',
  fontSize: '50px',
  textTransform: 'uppercase',
  [theme.breakpoints.down('xl')]: {
    fontSize: '40px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '28px',
    lineHeight: 'normal',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '24px',
  },
  [theme.breakpoints.down(400)]: {
    fontSize: '16px',
  },
}));

export const FeedbackParaTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontFamily: 'Lato, sans-serif',
  color: '#000000',
  fontSize: '16px',
  marginBottom: '30px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
  },
  [theme.breakpoints.down(576)]: {
    fontSize: '12px',
  }
}));
