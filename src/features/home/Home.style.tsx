'use client';

import { styled, Typography } from '@mui/material';

export const SectionDescriptionText = styled(Typography)(
  ({ color, center, fontSize }) => ({
    fontSize: fontSize || '16px',
    fontWeight: 400,
    color: color || '#005782',
    textAlign: center ? 'center' : 'left',
  }),
);
