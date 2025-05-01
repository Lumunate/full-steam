import { Box } from '@mui/material';

import FadeIn from '@/components/animations/FadeIn';
import { AppContentWrapper } from '@/components/common/Global.style';
import SectionMainHeading from '@/components/section-main-heading/SectionMainHeading';
import SectionHeading from '@/features/components/section-heading/SectionHeading';
import ServiceCard from '@/features/home/components/service-card/ServiceCard';

import { HeroWrapper, ServiceCardGrid } from './WhyChooseFSA.style';

const cards = [
  {
    heading: 'Simplified Daycare Search',
    description: 'Simplifies the daycare search process for families.',
    imgSrc: '/about/choose-fsa/sp-worker.png',
    background: '#A2D6DEB2',
  },
  {
    heading: 'Support for Daycare Providers',
    description: 'Connecting daycares with parents actively seeking spots.',
    imgSrc: '/about/choose-fsa/searching.png',
    background: '#E7C2D4B2',
  },
  {
    heading: 'A Trusted Childcare Network',
    description: 'Ensuring families find high-quality daycare options.',
    imgSrc: '/home/service-card/light-housekeeping.png',
    background: '#FEC7B5B2',
  },
];

const WhyChooseFSA: React.FC = () => {
  return (
    <>
      <AppContentWrapper>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            marginTop: '100px'
          }}
        >
          <SectionHeading text='Benefits' align='start' marginBottom='23px' />
          <SectionMainHeading
            center
            text='Why Choose '
            span='Full St3am Ahead?'
          />
          <ServiceCardGrid>
            {cards.map((card, index) => (
              <FadeIn
                key={index}
                direction='up'
                duration={1.5}
                distance={200}
              >

                <ServiceCard
                  heading={card.heading}
                  description={card.description}
                  imgSrc={card.imgSrc}
                  background={card.background}
                  fontsize='20px'
                />
              </FadeIn>
            ))}
          </ServiceCardGrid>
        </Box>
      </AppContentWrapper>
    </>
  );
};

export default WhyChooseFSA;
