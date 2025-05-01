'use client';

import { Box } from '@mui/material';
import { FC, useEffect, useRef } from 'react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import FadeIn from '@/components/animations/FadeIn';
import { AppContentWrapper } from '@/components/common/Global.style';
import SectionMainHeading from '@/components/section-main-heading/SectionMainHeading';
import SectionHeading from '@/features/components/section-heading/SectionHeading';
import ProcessCard from '@/features/home/components/process-cards/ProcessCards';

import { ProcessWrapperBoxLower, ProcessWrapperBoxUpper } from './HowItWorks.style';
import { ProcessMain, ProcessWrapper } from './HowItWorks.style';
import { SectionDescriptionText } from '../Home.style';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const processSteps = [
  {
    heading: 'Create Your Account',
    description:
      'Sign up as a family and tell us about your household and care needs.',
    logoSrc: '/home/how-it-works/user-square.svg',
  },
  {
    heading: 'Find Your Perfect Helper',
    description:
      'Browse profiles of verified Mom Helpers in your area and connect with them.',
    logoSrc: '/home/how-it-works/search.svg',
  },
  {
    heading: 'Schedule Service',
    description:
      'Book on-demand assistance or schedule regular help based on your familys needs.',
    logoSrc: '/home/how-it-works/schduele.svg',
  },
  {
    heading: 'Simple Payment',
    description:
      'Enjoy secure, automated payments after each session based on the helpers rate.',
    logoSrc: '/home/how-it-works/payment.svg',
  },
];

const HowItWorks: React.FC = () => {

  const swiperRef = useRef<SwiperType | null>(null);
  // const { data, isLoading } = useTestimonials();

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
    }
  }, [swiperRef.current]);

  return (
    <>
      <ProcessMain>
        <AppContentWrapper>
          <FadeIn>

            <ProcessWrapper>
              <ProcessWrapperBoxUpper >
                <SectionHeading
                  text='Process'
                  align='start'
                  marginBottom='23px'
                />
                <SectionMainHeading text='How It Works' />

                <SectionDescriptionText>
                Getting started with Full St3am Ahead is simple. Here&apos;s how
                you can find the perfect Mom Helper for your family.
                </SectionDescriptionText>
              </ProcessWrapperBoxUpper>

              <ProcessWrapperBoxLower
                
              >
                <Swiper
                  effect='ceter-autoed'
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={'auto'}
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 50,
                    depth: 100,
                    modifier: 2,
                    slideShadows: true,
                  }}
                  loop={true}
                  pagination={{ clickable: true }}
                  navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                  }}
                  onSwiper={swiper => {
                    swiperRef.current = swiper;
                  }}
                  modules={[EffectCoverflow, Pagination, Navigation]}
                >
                  {processSteps.map((step, index) => (
                    <SwiperSlide key={index} style={{    alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex'
                    }} >

                      <ProcessCard
                        index={`0${index + 1}`}
                        heading={step.heading}
                        description={step.description}
                        logoSrc={step.logoSrc}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </ProcessWrapperBoxLower>
            </ProcessWrapper>
          </FadeIn>
        </AppContentWrapper>
      </ProcessMain>
    </>
  );
};

export default HowItWorks;
