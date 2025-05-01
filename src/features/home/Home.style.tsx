'use client';

import { styled, Typography } from '@mui/material';

export const SectionDescriptionText = styled(Typography)<{
  color?: string;
  center?: boolean;
  fontSize?: string | number;
}>(
  ({ color, center, fontSize, theme }) => ({
    fontSize: fontSize || '16px',
    fontWeight: 400,
    color: color || '#005782',
    textAlign: center ? 'center' : 'left',
    position: 'relative',
    [theme.breakpoints.down(1200)]:{
      textAlign: 'center'
    }
  }),
);
