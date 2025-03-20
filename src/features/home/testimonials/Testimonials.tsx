import Link from 'next/link';

import { Button } from '../../../components/buttons/Button.style';
import SectionHeading from '../../../components/section-heading/SectionHeading';
import TestimonialsSwiper from '../../../components/swiper/testimonials-swiper/TestimonialsSwiper';
import { TestimonialsHeading, TestimonialsWrapper, TestimonialContiner } from '../../../features/home/testimonials/Testimonials.style';

const Testimonials = () => {
  return (
    <TestimonialsWrapper>
      <TestimonialContiner>

        <SectionHeading text="Testimonials"
          align='center' />
        <TestimonialsHeading variant="h2" sx={{ mt: '20px' }}>Here&apos;s What Our Clients Say</TestimonialsHeading>
        <Link href={'/feedback'}>
          <Button special
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
    </TestimonialsWrapper>
  );
};

export default Testimonials;
