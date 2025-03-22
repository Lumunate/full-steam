'use client';
import { styled, Typography, Box } from '@mui/material';

interface SectionHeadingProps {
  text: string;
  align?: 'center' | 'start';
  textSize?: string;
  marginBottom?: string;
}

const CommonHeadingContainer = styled(Box)<{
  align: string;
  textSize: string;
  marginBottom: string;
}>(({ align, marginBottom, textSize }) => ({
  background: '#34BCFF33',
  borderRadius: '15px',
  padding: '9px 17px',
  textAlign: align,
  width: textSize,
  fontSize: '16px',
  marginBottom: marginBottom,
}));

const CommonHeadingTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: '#005782',
  fontFamily: 'Urbanist, sans-serif',
  fontStyle: 'normal',
  whiteSpace: 'nowrap',
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.6rem',
    maxWidth: '140px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
  },
}));

const SectionHeading: React.FC<SectionHeadingProps> = ({
  text,
  align = 'start',
  textSize = 'fit-content',
  marginBottom = '16px',
}) => {
  return (
    <CommonHeadingContainer
      marginBottom={marginBottom}
      align={align}
      textSize={textSize}
    >
      <CommonHeadingTypography variant='main'>{text}</CommonHeadingTypography>
    </CommonHeadingContainer>
  );
};

export default SectionHeading;
