
'use client';
import FadeIn from '@/components/animations/FadeIn';
import { Link } from '@/i18n/routing';

import { Button } from '../../../components/buttons/Button.style';
import TestimonialsSwiper from '../../../components/swiper/testimonials-swiper/TestimonialsSwiper';
import {
  TestimonialsHeading,
  TestimonialsWrapper,
  TestimonialContiner,
} from '../../../features/home/testimonials/Testimonials.style';
import SectionHeading from '../../components/section-heading/SectionHeading';

const Testimonials = () => {
  return (
    <TestimonialsWrapper>
      <FadeIn direction='up' distance={200} duration={1.5}>

        <TestimonialContiner>
          <SectionHeading text='Testimonials' align='center' />
          <TestimonialsHeading variant='h2' sx={{ mt: '20px' }}>
          Here&apos;s What Our Clients Say
          </TestimonialsHeading>
          <Link href={'/feedback'}>
            <Button
              special
              fontSize='16px'
              borderRadius='50px'
              width='212px'
              height='60px'
            >
            Submit Feedback
            </Button>
          </Link>
        </TestimonialContiner>
        <TestimonialsSwiper />
      </FadeIn>
    </TestimonialsWrapper>
  );
};

export default Testimonials;