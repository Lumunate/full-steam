'use client';
import { Box } from '@mui/material';
import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

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
} from './TestimonialsSwiper.style';
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
interface IFeedback {
  id: number;
  name: string;
  lastName: string;
  relation: string;
  email?: string;
  sessionDate: Date | null;
  experience: string;
  feedback: string;
  createdAt: string;
}
const TestimonialsSwiper: FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/testimonials');

        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        const data = await response.json() as IFeedback[];
        const mappedData = data.map(feedback => ({
          name: `${feedback.name} ${feedback.lastName}`,
          subject: feedback.relation,
          feedback: feedback.feedback,
          date: new Date(feedback.createdAt).toLocaleDateString(),
          stars: parseInt(feedback.experience) || 5
        }));

        setTestimonials(mappedData);
      } catch  {
        setTestimonials([
          {
            name: 'Rose R., Oakville',
            subject: 'Childcare',
            feedback: `I honestly wish Full St3am Ahead had been around during the pandemic - it would have been such a lifesaver back then! As a busy Oakville mom juggling schedules, I find it incredibly helpful now. Knowing I can rely on it to help manage shuttling my kids organized and makes the constant shuttling between activities so much easier to handle. It&apos;s become a go-to resource for our family`,
            date: '2023-04-15',
            stars: 5
          },
          {
            name: 'Margie B., Toronto',
            subject: 'Meal Preparation',
            feedback: `Knowing that my husband, John, is being checked on regularly throughout the workday brings me a sense of calm that I didn't think was possible while still needing to work. His aggressive Alzheimer's can make things unpredictable, and the thought of him being agitated or unsafe while I'm not there used to weigh heavily on me. Now, with these in-home check-ins through Full St3am , I can focus on my work knowing someone is looking out for him. It's not just about his safety; it's about my peace of mind too, which is invaluable`,
            date: '2023-05-20',
            stars: 5
          },
          {
            name: 'Emma Wilson',
            subject: 'Tutoring',
            feedback: `I never expected that one of the most challenging parts of motherhood would be finding reliable, trustworthy help for me and my baby. Before finding Fullste3am, I had struggled to find someone who could help me around the house and with my child while also being on time and showing up regularly. It was a godsend to find this website because now, I have the perfect helper and I can leave my child without having to worry about her safety or whether she will be cared for properly. I also can go to work myself knowing that I will come home and things will be running smoothly at home and I won’t be walking into a disaster. I also can plan things better because I have reliable help so I get the things done that I need to get done! No more waking up in the middle of the night worrying how I’m going to manage things!`,
            date: '2023-06-10',
            stars: 4
          },
          {
            name: 'Rosa Park',
            subject: 'Tutoring',
            feedback: `I never expected that one of the most challenging parts of motherhood would be finding reliable, trustworthy help for me and my baby. Before finding Fullste3am, I had struggled to find someone who could help me around the house and with my child while also being on time and showing up regularly. It was a godsend to find this website because now, I have the perfect helper and I can leave my child without having to worry about her safety or whether she will be cared for properly. I also can go to work myself knowing that I will come home and things will be running smoothly at home and I won’t be walking into a disaster. I also can plan things better because I have reliable help so I get the things done that I need to get done! No more waking up in the middle of the night worrying how I’m going to manage things!`,
            date: '2023-06-10',
            stars: 4
          },
          {
            name: 'Nikita Chang',
            subject: 'Childcare',
            feedback: `I never expected that one of the most challenging parts of motherhood would be finding reliable, trustworthy help for me and my baby. Before finding Fullste3am, I had struggled to find someone who could help me around the house and with my child while also being on time and showing up regularly. It was a godsend to find this website because now, I have the perfect helper and I can leave my child without having to worry about her safety or whether she will be cared for properly. I also can go to work myself knowing that I will come home and things will be running smoothly at home and I won’t be walking into a disaster. I also can plan things better because I have reliable help so I get the things done that I need to get done! No more waking up in the middle of the night worrying how I’m going to manage things!`,
            date: '2023-06-10',
            stars: 4
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
    }
  }, [swiperRef.current, testimonials]);
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

  if (isLoading) {
    return <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading testimonials...</Box>;
  }

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
        {testimonials.map((testimonial: Testimonial, index: number) => (
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