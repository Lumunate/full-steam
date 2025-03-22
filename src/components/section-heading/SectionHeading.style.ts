'use client';

import { styled, Typography, Box } from '@mui/material';

export const CommonHeadingContainer = styled(Box)<{
  align: string;
  textSize: string;
  marginBottom: string;
}>(({ theme, align, marginBottom, textSize }) => ({
  background: '#34BCFF33',
  borderRadius: '15px',
  padding: '9px 17px',
  textAlign: align,
  width: textSize,
  fontSize: '16px',
  marginBottom: marginBottom,
}));

export const CommonHeadingTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: '#005782',
  fontStyle: 'normal',
  whiteSpace: 'nowrap',
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.6rem',
    maxWidth: '140px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
  },
}));
