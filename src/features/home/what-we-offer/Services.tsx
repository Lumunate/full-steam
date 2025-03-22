import { AppContentWrapper } from '@/components/common/Global.style';
import SectionMainHeading from '@/components/section-main-heading/SectionMainHeading';
import SectionHeading from '@/features/components/section-heading/SectionHeading';
import ServiceCard from '@/features/home/components/service-card/ServiceCard';

import { ServiceWrapper, WhatWeOfferCards } from './ServicesWrapper.style';

const cards = [
  {
    heading: 'Childcare',
    description:
      'Quality care for your children in your home, with activities tailored to their age and interests',
    imgSrc: '/home/service-card/childcare.png',
    background: '#A2D6DEB2',
  },
  {
    heading: 'Meal Preparation',
    description:
      'Nutritious meals prepared fresh in your kitchen, customized to your familys preferences and dietary needs.',
    imgSrc: '/home/service-card/meal-prepartion.png',
    background: '#E7C2D4B2',
  },
  {
    heading: 'Light Housekeeping',
    description:
      'Keeping your living space tidy and organized, from vacuuming to laundry and dishes.',
    imgSrc: '/home/service-card/light-housekeeping.png',
    background: '#FEC7B5B2',
  },
  {
    heading: 'Tutoring',
    description:
      'Academic support and homework help for students of all ages and learning abilities.',
    imgSrc: '/home/service-card/tutoring.png',
    background: '#92BDF6B2',
  },
  {
    heading: 'Elderly Check-in',
    description:
      'Compassionate assistance and regular check-ins for elderly family members, providing peace of mind.',
    imgSrc: '/home/service-card/elderly.png',
    background: '#DEA2C6B2',
  },
  {
    heading: 'Daycare Matching',
    description:
      'Find the perfect daycare spot for your child through our specialized matching service.',
    imgSrc: '/home/service-card/daycare-matching.png',
    background: '#A4D2FFB2',
  },
  {
    heading: 'Pet Minding',
    description:
      'Caring attention for your furry family members, including feeding, walking, and playtime.',
    imgSrc: '/home/service-card/pet-minding.png',
    background: '#B5BAFEB2',
  },
];

const Services: React.FC = () => {
  return (
    <>
      <AppContentWrapper>
        <ServiceWrapper>
          <SectionHeading text='Services' align='start' marginBottom='23px' />
          <SectionMainHeading text='What We Offer' />

          <WhatWeOfferCards sx={{ marginTop: '110px' }}>
            {cards.map((card, index) => (
              <ServiceCard
                key={index}
                heading={card.heading}
                description={card.description}
                imgSrc={card.imgSrc}
                background={card.background}
              />
            ))}
          </WhatWeOfferCards>
        </ServiceWrapper>
      </AppContentWrapper>
    </>
  );
};

export default Services;
