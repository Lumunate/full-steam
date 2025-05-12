'use client';
import { Typography } from '@mui/material';

import {
  MainHeadingSpan,
  MainHeadingTypography,
} from './SectionMainHeading.style';

interface SectionHeadingProps {
  text: string;
  span?: string;
  color?: string;
  text2?: string;
  center?: boolean;
  marginbottom?: string;
}

const SectionMainHeading: React.FC<SectionHeadingProps> = ({
  text,
  span = '',
  color = 'black',
  text2 = '',
  center = false,
  marginbottom = '18px',
}) => {
  return (
    <MainHeadingTypography
      marginBottom={marginbottom}
      center={center}
      variant='h2'
      color={color}
    >
      {text}
      <MainHeadingSpan variant='caption'>{span}</MainHeadingSpan>
      
      <MainHeadingTypography>
        {text2}
      </MainHeadingTypography>
    </MainHeadingTypography>
  );
};

export default SectionMainHeading;
