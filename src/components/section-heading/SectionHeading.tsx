'use client';

import { CommonHeadingContainer, CommonHeadingTypography } from './SectionHeading.style';

interface SectionHeadingProps {
  text: string;
  align?: 'center' | 'start'; 
  textSize?: string;
  marginBottom?: string;     
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  text, 
  align = 'start',  
  textSize = 'fit-content', 
  marginBottom = '16px',
}) => {
  return (
    <CommonHeadingContainer marginBottom={marginBottom} align={align} textSize={textSize}>
      <CommonHeadingTypography variant="h6" >
        {text}
      </CommonHeadingTypography>
    </CommonHeadingContainer>
  );
};

export default SectionHeading;
