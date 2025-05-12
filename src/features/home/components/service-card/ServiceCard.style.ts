'use client';

import { styled, Box, Typography } from '@mui/material';
import Image from 'next/image';
export const CardContainer = styled(Box)<{ background: string }>(
  ({ background, theme }) => ({
    background: background,
    borderRadius: '16px',
    padding: '48px 41px 51px 27px',
    display: 'flex',
    height: '393px',
    width: '340px',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    boxShadow: '0px 4px 11.3px 0px #00000040',

    [theme.breakpoints.down(900)]:{
      height: '261px',
      width: '287px'
    }
  })
);
export const CardHeading = styled(Typography)<{fontSize?: string}>(({ fontSize, theme }) => ({
  fontSize: fontSize ? fontSize : '33px',
  fontWeight: 600,
  color: '#005782',
  lineHeight: '100%',
  letterSpacing: '-1px',
  marginBottom: '10px',
  [theme.breakpoints.down(900)]:{
    fontSize: '14px'
  }
}));

export const CardDescription = styled(Typography)(({theme}) => ({
  fontSize: '16px',
  fontWeight: 400,
  color: '#005782',
  textTransform: 'capitalize',
  [theme.breakpoints.down(900)]:{
    fontSize: '13px'
  }
}));

export const CardImageContainer = styled(Box)(() => ({
  position: 'absolute',
  bottom: '0',
  right: '0',
}));

export const ArrowImage = styled(Image)(({theme}) => ({
  zIndex:5,
  [theme.breakpoints.down(900)]:{
    width: '42px',
    height: '42px'
  }

}));
export const CardImage = styled(Image)(({theme}) => ({
  objectFit: 'cover',
  width: '100%',

  [theme.breakpoints.down(900)]:{
    width: '186px !important',
    height: '186px !important'
  }

}));

export const CardContent = styled(Box)(() => ({}));
