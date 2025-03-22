'use client';

import { Box } from '@mui/material';
import Image from 'next/image';
import { FC, useEffect, useRef } from 'react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import testimonialsData from './testimonialsData.json';
import {
  TestimonialsAvatarNameWrapper,
  TestimonialsCard,
  TestimonialsCardHeading,
  TestimonialsCardPara,
  TestimonialsOccupationPara,
  TestimonialsSwiperWrapper,
  TestimonialsNavigationWrapper,
  TestimonialsInfoHead,
  TestimonialAvatar,
  TestimonialsStarsHead,
  QuotationImageHead,
} from '../../../components/swiper/testimonials-swiper/TestimonialsSwiper.style';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Testimonial {
  name: string;
  subject: string;
  feedback: string;
  date: string;
  stars: number;
}

const TestimonialsSwiper: FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  // const { data, isLoading } = useTestimonials();

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
    }
  }, [swiperRef.current]);

  const renderStars = (starCount: number) => {
    return Array.from({ length: starCount }, (_, index) => (
      <Image
        key={index}
        src='/icons/star.svg'
        width={16}
        height={15}
        alt='Star-icon'
        style={{ marginRight: '5px' }}
        loading='lazy'
      />
    ));
  };

  return (
    <TestimonialsSwiperWrapper>
      <TestimonialsNavigationWrapper left='50%' width='300px'>
        <Box className='swiper-button-prev'>
          <Image
            src='/icons/prev.svg'
            alt='Prev'
            width={14}
            height={11}
            loading='lazy'
          />
        </Box>
        <Box className='swiper-button-next' sx={{ position: 'absolute' }}>
          <Image
            src='/icons/next.svg'
            alt='Next'
            width={14}
            height={11}
            loading='lazy'
          />
        </Box>
      </TestimonialsNavigationWrapper>

      <Swiper
        effect='coverflow'
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 50,
          depth: 100,
          modifier: 2,
          slideShadows: false,
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
        {testimonialsData?.map((testimonial: Testimonial, index: number) => (
          <SwiperSlide key={index}>
            <TestimonialsCard>
              <Box>
                <TestimonialsInfoHead>
                  <TestimonialsAvatarNameWrapper>
                    <TestimonialAvatar alt={testimonial.name} src={''} />
                    <Box>
                      <TestimonialsCardHeading variant='h6'>
                        {testimonial.name}
                      </TestimonialsCardHeading>
                      <TestimonialsOccupationPara variant='subtitle2'>
                        {testimonial.subject}
                      </TestimonialsOccupationPara>
                    </Box>
                  </TestimonialsAvatarNameWrapper>
                  <QuotationImageHead>
                    <Image
                      src='/icons/quotation.svg'
                      alt='quotation-icon'
                      layout='fill'
                      loading='lazy'
                    />
                  </QuotationImageHead>
                </TestimonialsInfoHead>
                <TestimonialsStarsHead>
                  {renderStars(testimonial.stars)}
                </TestimonialsStarsHead>
                <TestimonialsCardPara variant='body1' sx={{ mb: '16px' }}>
                  {testimonial.feedback}
                </TestimonialsCardPara>
              </Box>
            </TestimonialsCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </TestimonialsSwiperWrapper>
  );
};

export default TestimonialsSwiper;
