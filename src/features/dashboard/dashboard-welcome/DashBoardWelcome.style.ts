import { Box, styled, Typography, Input } from '@mui/material';
import Image from 'next/image';
export const DashBoardBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
});

export const DashBoardWelcomeBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
});
export const DashBoardHeading = styled(Typography)({
  fontSize: '36px',
  color: '#3E3E3E',
  fontWeight: 600,
  letterSpacing: 0,
  flex: 1,
});

export const DashBoardWelcomeControls = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const DashBoardSearchInput = styled(Input)({});
export const DashBoardWelcomeBack = styled(Typography)({
  fontSize: '16px',
  color: '#6B7280',
  fontWeight: 400,
});
export const DashBoardSettings = styled(Image)({});
export const DashBoardNotifications = styled(Image)({});
export const DashBoardUserProfile = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '12px',
});
export const DashBoardUserImage = styled(Image)({
  borderRadius: '50%',
  overflow: 'hidden',
});
export const DashBoardUserDetails = styled(Box)({});
export const DashBoardUserName = styled(Typography)({
  fontSize: '14px',
  fontWeight: 600,
  color: '#000000',
});
export const DashBoardUserRole = styled(Typography)({
  fontSize: '12px',
  fontWeight: 400,
  color: '#6B7280',
});

export const DashBoardSearchInputBox = styled(Box)({
  background: '#F5F7FA',
  borderRadius: '40px',
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  padding: ' 15px 25px ',
});
