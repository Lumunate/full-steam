'use client';

import { styled, Typography } from '@mui/material';

export const SectionDescriptionText = styled(Typography)(
  ({  color }) => ({
    fontSize: '16px',
    fontWeight: 400,
    color: color,
  }),
);
