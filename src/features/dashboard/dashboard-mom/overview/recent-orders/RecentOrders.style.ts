'use client';

import { Box, styled, Typography } from '@mui/material';
import {RadioGroup} from '@mui/material';

import { StyledLabel } from '@/components/form/Froms.style';

export const UpcommingSessionBox = styled(Box)({
  marginTop: '23px',

  boxShadow: '0px 16px 24px 0px #0000000F',
  borderRadius: '28px',
  paddingTop: '40px',
  paddingRight: '24px',
  paddingBottom: '40px',
  paddingLeft: '24px',
});

export const UpcommingSessionHeading = styled(Typography)({
  fontSize: '22px',
  fontWeight: 700,
});

export const UpcomingSessionTypography = styled(Typography)({
  fontSize: '16px',
  color: '#6B7280',
});

export const UpcomingSessionBox = styled(Box)({
  display: 'flex',
  marginTop: '16px',
  justifyContent: 'space-between',
  border: '1px solid #E1F2FF',
  borderRadius: '12px',
  padding: '12px',
  position: 'relative',
  height: '92px',
});

export const UpcomingSessionDay = styled(Typography)({
  fontSize: '16px',
  color: '#1A1A1A',
  fontWeight: 600,
});

export const TimingBox = styled(Box)({
  display: 'flex',
  gap: '8px',
});

export const UpcomingSessionsTimingsBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',

});

export const UpcomingSessionTime = styled(Typography)({
  color: '#818181',
  fontSize: '14px',
  letterSpacing: '0'

});

export const ButtonBox = styled(Box)({
  display: 'flex',
  gap: '8px',
  marginTop: '24px',
  justifyContent: 'flex-end',
});

export const RadioContainer = styled(RadioGroup)({
  background: '#DFEAF2',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '8px',
  marginTop: '16px',
  borderRadius: '12px',
  width: '331px',
  fontSize: '14px',
});

export const StyledLabelSession = styled(StyledLabel)({
  fontSize: '14px ',
});