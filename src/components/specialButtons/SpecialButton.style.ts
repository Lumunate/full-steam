'use client';

import { styled, Box } from '@mui/material';

export const SpecialButtonContainer = styled(Box)(() => ({
  fontSize: '12px',
  fontWeight: 700,
  display: 'flex',
  color: '#1570B8',
  width: '270px',
  height: '60px',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: 'linear-gradient(89.8deg, #BAE6FF 0.15%, rgba(125, 198, 255, 0.17) 100.01%)',
  borderRadius: '400px',
  padding: '8px 16px 8px 8px',
  
}));

export const SpecialBtnAfter = styled(Box)(({position, index}) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  position: position ? 'absolute' : 'static',
  top: index === 0 || index === 1 ? `calc(-100px - ${index * 40}px)` : '',
  left: index === 0 || index === 2 ? `calc(-50px + ${index * 40}px)` : '',
  right: index === 1 || index === 3 ? `calc(-50px + ${index * 40}px)` : '',    
  bottom: index === 2 || index === 3 ? `calc(-50px - ${ (index - 2 ) * 40}px)` : ''  

}));