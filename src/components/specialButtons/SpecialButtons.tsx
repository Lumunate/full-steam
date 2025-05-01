'use client';

import { Box } from '@mui/material';
import Image from 'next/image';

import { SpecialButtonContainer , ShieldImage } from './SpecialButton.style';
import { SpecialBtnAfter } from './SpecialButton.style';
interface SectionHeadingProps {
  text: string;
  position?: boolean;
  index?: number;
  buttonBox?: boolean;
}

const SpecialButton: React.FC<SectionHeadingProps> = ({
  text,
  position = false,
  index = 0,
  buttonBox,
}) => {
  return (
    <SpecialBtnAfter index={index} position={position as any}>
      {buttonBox && index && index % 2 === 1 ? (
        <Image
          alt='Button Icon'
          src='/icons/button-circle.svg'
          height={20}
          width={20}
        />
      ) : null}

      <SpecialButtonContainer>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldImage
            src='/specialButton/logo-wrapper.svg'
            alt='hero-image'
            width={40}
            height={40}
          />
          {text}
        </Box>
        <Image
          src='/specialButton/arrow-up.svg'
          alt='hero-image'
          width={18}
          height={18}
        />
      </SpecialButtonContainer>
      {buttonBox && index && index % 2 === 0 ? (
        <Image
          alt='Button Icon'
          src='/icons/button-circle.svg'
          height={20}
          width={20}
        />
      ) : null}
    </SpecialBtnAfter>
  );
};

export default SpecialButton;
