'use client';

import { Box, styled, Typography } from '@mui/material';

export const PerfectHelperWrapper = styled(Box)({
  background: `url('/home/perfect-helper/perfect-helper.png')`,
  width: '100%',
  minHeight: 'calc(60vh )',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  position: 'relative',
});
export const PerfectHelperOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background:
    'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),linear-gradient(84.75deg, #37B5FF 0.22%, rgba(0, 0, 0, 0) 99.77%)',
  zIndex: 1,
});

export const ContentWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '117px',
});

export const HelperTypography = styled(Typography)({
  fontSize: '18px',
  color: '#fff',
  textAlign: 'center',
});
