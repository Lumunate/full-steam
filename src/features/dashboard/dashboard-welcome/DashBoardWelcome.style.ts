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
export const DashBoardUserDetails = styled(Box)({
  position: 'relative',
  cursor: 'pointer'
});
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

export const DashBoardLogoutDropDown = styled(Box)<{ logout?: boolean }>(({ logout }) => ({
  background: '#FCFDFF',
  borderRadius: '15px',
  boxShadow: '0px 4px 37.4px 0px #00000038',
  padding: '12px 18px',
  width: '100px',
  textAlign: 'center',
  position: 'absolute',
  right: 0,
  top: '50px',
  display: logout ? 'block' : 'none',
}));
