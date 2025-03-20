'use client';

import { SectionDescriptionText } from './SectionDescription.style';
interface SectionHeadingProps {
  text: string; 
  color?: string; 
}

const SectionDescription: React.FC<SectionHeadingProps> = ({ 
  text,
  color = '#005782'
}) => {
  return (
    <SectionDescriptionText variant="p" color={color}  >
      {text}
    </SectionDescriptionText>

  );
};

export default SectionDescription;
