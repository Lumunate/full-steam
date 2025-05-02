'use client';

import { styled, Box } from '@mui/material';
import Image from 'next/image';
export const SpecialButtonContainer =  styled(Box)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 700,
  display: 'flex',
  color: '#1570B8',
  width: '270px',
  height: '60px',
  alignItems: 'center',
  justifyContent: 'space-between',
  background:
    'linear-gradient(89.8deg, #BAE6FF 0.15%, rgba(125, 198, 255, 0.17) 100.01%)',
  borderRadius: '400px',
  padding: '8px 16px 8px 8px',

  [theme.breakpoints.down(600)]: {
    fontSize: '9px !important',
    maxWidth: '150px !important',
    height: '36.5px'
  },
}));

export const ShieldImage = styled(Image)(({ theme }) => ({
  [theme.breakpoints.down(1200)]: {
    width: '20px',
    height: '20px',
  },

}));

export const SpecialBtnAfter = styled(Box)<{
  position?: boolean;
  index: number;
}>(({ position, index, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  position: position ? 'absolute' : 'static',
  top: position && index === 0 || position && index === 1 ? `calc(-100px - ${index * 40}px)` : '',
  left: position && index === 0 || position && index === 2 ? `calc(-50px + ${index * 40}px)` : '',
  right: position && index === 1 || position && index === 3 ? `calc(-50px + ${index * 40}px)` : '',
  bottom:
  position && index === 2 || position &&  index === 3 ? `calc(-50px - ${(index - 2) * 40}px)` : '',
  [theme.breakpoints.down(1200)]:{
    
    top: position && index === 0 || position && index === 1 ? `calc(-75px - ${index * 25}px)` : '',
    left: position && index === 0 || position && index === 2 ? `calc(25px + ${index * 10}px)` : '',
    right: position && index === 1 || position && index === 3 ? `calc(25px + ${index * 10}px)` : '',
    bottom:
    position && index === 2 || position &&  index === 3 ? `calc(-75px - ${(index - 2) * 40}px)` : '',
  }
}));
