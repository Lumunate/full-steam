'use client';

import { Box, styled, Typography } from '@mui/material';

export const ApplicationBlock = styled(Box)({
  marginTop: '50px',
});
export const ApplicationHeading = styled(Typography)({
  fontSize: '28px',
  fontWeight: 400,
  marginBottom: '16px',
});

export const ApplicationStatus = styled(Typography)<{isApproved?: boolean}>(({ isApproved }) => ({
  fontSize: '28px',
  fontWeight: 700,
  color: isApproved ? '#28a745' : '#02405F', 
}));
export const Account = styled(Typography)({
  marginTop: '16px',
  marginBottom: '19px',
});
