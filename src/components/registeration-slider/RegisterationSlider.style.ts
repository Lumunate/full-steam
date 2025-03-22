'use client';
import { Box, styled, Typography } from '@mui/material';

export const SliderBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  width: '100%',
  maxWidth: '900px',
  marginTop: '85px',
});

export const Slider = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '17px',
  zIndex: 1,
});

export const SliderTypography = styled(Typography)({
  fontSize: '16px',
  fontWeight: '700',
  color: '#005782',
});

export const SliderCircle = styled(Box)<{ select?: boolean }>(({ select }) => ({
  borderRadius: '50px',
  padding: '16px 32px',
  background: select ? '#37B5FF' : '#FFFFFF',
  boxShadow: select ? 'none' : '0px 1px 5.7px 0px #00000047',
}));

export const SelectedTypography = styled(Typography)<{ select?: boolean }>(
  ({ select }) => ({
    fontSize: '32px',
    color: select ? '#FFFFFF' : '#005782',
    width: '19px',
    display: 'flex',
    justifyContent: 'center',
    fontWeight: '700',
  }),
);

export const SliderLine = styled(Box)({
  height: '1px',
  background: '#DFEAF2',
  width: '90%',
  position: 'absolute',
  zIndex: 0,
  top: '40%',
  left: '50%',
  transform: 'translateX(-50%)',
});
