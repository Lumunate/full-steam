'use client';

import { Box } from '@mui/material';
import Image from 'next/image';

import {
  ProcessCardContainer,
  ProcessCardDescription,
  ProcessCardHeading,
  ProcessCardNumber,
  ProcessImage
} from './ProcessCard.style';
interface ProcessCardProps {
  heading: string;
  description: string;
  logoSrc: string;
  index: string;
}

const ProcessCard: React.FC<ProcessCardProps> = ({
  heading,
  description,
  logoSrc,
  index,
}) => {
  return (
    <ProcessCardContainer>
      <ProcessCardNumber>{index}</ProcessCardNumber>

      <Box>
        <ProcessCardHeading>
          
          <ProcessImage src={logoSrc} alt={heading} height={47} width={47} /> {heading}
        </ProcessCardHeading>
        <ProcessCardDescription>{description}</ProcessCardDescription>
      </Box>
    </ProcessCardContainer>
  );
};

export default ProcessCard;
