'use client';

import Image from 'next/image';

import { CardContainer, CardDescription, CardHeading, CardImageContainer, CardContent } from './ServiceCard.style';
interface ServiceCardProps {
  heading: string;
  description: string;      
  imgSrc: string;
background: string;
fontsize?: string;

}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  heading,
  description,
  imgSrc,
  background,
  fontsize = '33px'
}) => {
  return (
    <CardContainer background={background}>
      <CardContent>
        <CardHeading fontSize={fontsize} variant='h3'>{heading}</CardHeading>
        <CardDescription variant='p' >{description}</CardDescription>
      </CardContent>

      <Image  src="/home/service-card/arrow.svg" alt="arrows" width={64} height={64} />

      <CardImageContainer>

        <Image src={imgSrc} alt={heading} width={220} height={220}  />
      </CardImageContainer>
    </CardContainer>
  );
};

export default ServiceCard;
