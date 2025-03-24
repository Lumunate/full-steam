import { Box, styled, Typography } from '@mui/material';

export const DashBoardNav = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRight: '1px solid #E5E7EB',
  paddingTop: '37px',
  height: '100vh',
  paddingLeft: '24px',
  paddingRight: '24px',
});

export const DashBoardOptions = styled(DashBoardNav)({
  gap: '24px',
  marginTop: '55px',
  borderRight: 'none',
  paddingTop: 0,
});

export const DashBoardOption = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '12px',
  borderRadius: '8px',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
  cursor: 'pointer',
  padding: '16px',
  transition: 'all .3s',
  paddingRight: '47px',

  '&:hover': {
    background: '#DAF5FF',
  },
});

export const DashBoardTypography = styled(Typography)({
  color: '#374151',
  fontSize: '14px',
  fontWeight: '400',
  whiteSpace: 'nowrap',
});
