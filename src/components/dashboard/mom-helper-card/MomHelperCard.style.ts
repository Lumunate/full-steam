'use client';

import {styled, Box, Typography} from '@mui/material';
import Image from 'next/image';

export const ButtonContainer = styled(Box)(() => ({
  display: 'flex',
  gap: '10px',
  justifyContent:'center',
  marginTop: '32px',
}));

export const MomHelperCardContainer = styled(Box)(() => ({
  boxShadow: '0px 2px 20.9px 0px #0000002B',
  borderRadius: '12px',
  padding: '16px',
  position: 'relative',
  maxWidth: '424px',
}));

export const MomHelperBanner = styled(Image)(() => ({
  position: 'absolute',
  left: '0',
  top: '0',
  maxWidth: '100%',
}));

export const MomHelperProfileImage = styled(Image)(() => ({
  borderRadius: '50%',
  position: 'relative',
  zIndex: '1',
  background: 'white',
  padding: '2px',
}));

export const MomHelperName = styled(Typography)(() => ({
  fontSize: '38px',
  fontWeight: 500,
  lineHeight: '100%'

}));

export const LookingForTypography = styled(Typography)(() => ({
  fontSize: '22px',
  color: '#747474',
  textAlign: 'center',
  marginTop: '16px',
}));

export const RatingTypography = styled(Typography)(() => ({
  fontSize: '22px',
  color: '#A2A2A2',
}));

export const StartingTypography = styled(RatingTypography)(() => ({
  fontSize: '14px'
}));

export const PricesTypography = styled(Typography)(() => ({
  color: '#00C8FF',
  fontSize: '22px',
}));

export const PriceHr = styled(Typography)(() => ({
  fontSize: '22px',
  color: '#A2A2A2',
  display: 'flex',
  alignItems: 'center',
  lineHeight: '100%',

}));

export const OfferedTypography = styled(Typography)(() => ({
  color: '#005782',
  fontSize: '14px',
  marginTop: '5px',
}));
