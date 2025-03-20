'use client';

import { Box, } from '@mui/material';
import Image from 'next/image';

import { StatHolderContainer, StatHolderHeading, StatHolderPara } from './StatHolder.style';

interface StatHolderProps {
  text1: string;
  text2: string;
  imgSrc: string;
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
}

const StatHolder: React.FC<StatHolderProps> = ({ text1, text2, imgSrc, top = 0, bottom = 0, right =0 ,left =0 }) => {
  return (
    <StatHolderContainer sx={{position: 'absolute', top:top , bottom:bottom, right: right, left: left }} >
      <Image src={imgSrc} alt="hero-image" width={40} height={40} />
      <Box sx={{marginLeft: '8px'}}>
        <StatHolderHeading>{text1}</StatHolderHeading>
        <StatHolderPara>{text2}</StatHolderPara>
      </Box>
    </StatHolderContainer>
  );
};

export default StatHolder;
