'use client';

import { styled, Typography } from '@mui/material';

export const SectionDescriptionText = styled(Typography)<{
  color?: string;
  center?: boolean;
  fontSize?: string | number;
  margin?: number;
}>(
  ({ color, center, fontSize, theme, margin }) => ({
    fontSize: fontSize || '16px',
    fontWeight: 400,
    color: color || '#005782',
    textAlign: center ? 'center' : 'left',
    position: 'relative',
    margin: margin && `0 ${margin}px `,
    [theme.breakpoints.down(1200)]:{
      textAlign: 'center',
      margin: 0,
      fontSize: '14px'

    }
  }),
);
