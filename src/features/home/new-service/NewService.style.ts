'use client';

import { Box, ListItem, styled, Typography } from '@mui/material';
import Image from 'next/image';

const CommonHeroTypography = styled(Typography)({
  fontWeight: 400,
  fontStyle: 'normal',
});

export const ServiceCheckList = styled(ListItem)({
  padding: 0,
  marginBottom: '14px',
  display: 'flex',
  gap: '10px',
  color: '#005782',
});

export const HeroHeading = styled(CommonHeroTypography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '50px',
  marginTop: '43px',
  lineHeight: '53px',
  fontFamily: 'Jost, sans-serif',
  maxWidth: '600px',
  textTransform: 'capitalize',
  color: '#fff',
  textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  [theme.breakpoints.down(1400)]: {
    fontSize: '44px',
  },
  [theme.breakpoints.down('xl')]: {
    fontSize: '40px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '30px',
    lineHeight: 'normal',
    marginTop: '30px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '24px',
    maxWidth: '450px',
    lineHeight: 'normal',
    marginTop: '20px',
  },
  [theme.breakpoints.down(400)]: {
    fontSize: '16px',
    marginTop: '10px',
  },
}));

export const HeroContent = styled(CommonHeroTypography)(({ theme }) => ({
  fontSize: '18px',
  marginBottom: '10px',
  fontFamily: 'Lato, sans-serif',
  maxWidth: '779px',
  textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  color: '#fff',
  [theme.breakpoints.down('xl')]: {
    fontSize: '16px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    lineHeight: 'normal',
  },
  [theme.breakpoints.down(400)]: {
    fontSize: '12px',
  },
}));

export const NewServiceWrapper = styled(Box)({
  width: '100%',
  minHeight: 'calc(100vh)',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

export const HeroImage = styled(Image)({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const HeroDesriptionHolder = styled(Box)({
  maxWidth: '560px',
});
export const ButtonsContianer = styled(Box)({
  display: 'flex',
  gap: '22px',
  marginTop: '30px',
});

export const ButtonsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '22px',
  marginTop: '30px',
});

export const HeroImageOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background:
    'linear-gradient(0deg, rgba(0, 0, 0, 0.46) 0%, rgba(0, 0, 0, 0.46) 100%)',
  filter: 'drop-shadow(0px 4px 20.8px rgba(0, 0, 0, 0.55)',
});

export const HeroContentContainer = styled(Box)(({ theme }) => ({
  padding: '265px 0 349px',
  display: 'flex',
  alignItems: 'end',
  [theme.breakpoints.down('lg')]: {
    padding: '180px 0 300px',
    flexWrap: 'wrap',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '160px 0 280px',
  },
  [theme.breakpoints.down(400)]: {
    padding: '150px 0 280px',
  },
}));
