'use client';

import { Box } from '@mui/material';
import Image from 'next/image';

import {
  StatHolderContainer,
  StatHolderHeading,
  StatHolderPara,
  StatImage
} from './StatHolder.style';

interface StatHolderProps {
  text1: string;
  text2: string;
  imgSrc: string;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  yes?: boolean;
}

const StatHolder: React.FC<StatHolderProps> = ({
  text1,
  text2,
  imgSrc,
  top = 0,
  bottom = 0,
  right = 0,
  left = 0,
  yes = false
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        gap: '16px',
        top: top ?  `${top}%` : '',
        bottom: bottom ? `${bottom}%` : '',
        right: right ?  `${right}%` : '',
        left: left ? `${left}%` : '',
        '@media (max-width: 800px)':{
          right: right ?  `${right/2}%` : '',
          left: left ? `${left/10}%` : '',
        }
      }}
    >
      {yes && 
      
      <Image
        alt='Button Icon'
        src='/icons/button-circle.svg'
        height={20}
        width={20}
      />
      }      <StatHolderContainer
        
      >
        <StatImage src={imgSrc} alt='hero-image' width={40} height={40} />
        <Box sx={{ marginLeft: '8px' }}>
          <StatHolderHeading>{text1}</StatHolderHeading>
          <StatHolderPara>{text2}</StatHolderPara>
        </Box>
      </StatHolderContainer>
      {!yes &&
      
      <Image
        alt='Button Icon'
        src='/icons/button-circle.svg'
        height={20}
        width={20}
      />
      }
    </Box>
  );
};

export default StatHolder;
