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

export const SliderTypography = styled(Typography)(({theme}) =>({
  fontSize: '16px',
  fontWeight: '700',
  color: '#005782',
  [theme.breakpoints.down(1200)] :{
    fontSize : '10px'
  }
}));

export const SliderCircle = styled(Box)<{ select?: boolean }>(({ select , theme}) => ({
  borderRadius: '50px',
  padding: '16px 32px',
  background: select ? '#37B5FF' : '#FFFFFF',
  boxShadow:  '0px 1px 5.7px 0px #00000047',
  [theme.breakpoints.down(1200)]: {
    padding: '12px',
    borderRadius: '25px'
  }
}));

export const SelectedTypography = styled(Typography)<{ select?: boolean }>(
  ({ select , theme }) => ({
    fontSize: '32px',
    color: select ? '#FFFFFF' : '#005782',
    width: '19px',
    display: 'flex',
    justifyContent: 'center',
    fontWeight: '700',
    [theme.breakpoints.down(1200)] : {
      fontSize: '13px'
    }
  })
);

export const SliderLine = styled(Box)(({theme}) => ({
  height: '1px',
  background: '#DFEAF2',
  width: '82%',
  position: 'absolute',
  zIndex: 0,
  top: '30%',
  left: '50%',
  transform: 'translateX(-50%)',
  [theme.breakpoints.down(500)]:{
    width: '70%',

  }
}));
