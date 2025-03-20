'use client';

import { Box } from '@mui/material';
import Image from 'next/image';

import { SpecialButtonContainer } from './SpecialButton.style';
interface SectionHeadingProps {
  text: string;     
}

const SpecialButton: React.FC<SectionHeadingProps> = ({ 
  text, 
}) => {
  return (
    <SpecialButtonContainer  >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

        <Image src="/specialButton/logo-wrapper.svg" alt="hero-image" width={40} height={40} />
        {text}
      </Box>
      <Image src="/specialButton/arrow-up.svg" alt="hero-image" width={18} height={18} />
    </SpecialButtonContainer>

  );
};

export default SpecialButton;
