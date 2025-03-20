'use client';

import { MainHeadingSpan, MainHeadingTypography } from './SectionMainHeading.style';
interface SectionHeadingProps {
  text: string;
  span?: string;     
  color? :string; 
}

const SectionMainHeading: React.FC<SectionHeadingProps> = ({ 
  text, 
  span = '',
  color = 'black'
}) => {
  return (
    <MainHeadingTypography variant="h2" color={color} >
      {text}
      <MainHeadingSpan>
        {span}
      </MainHeadingSpan>
    </MainHeadingTypography>

  );
};

export default SectionMainHeading;
