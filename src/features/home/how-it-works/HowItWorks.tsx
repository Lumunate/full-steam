
import {Box} from '@mui/material';
// import { Pagination } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { AppContentWrapper } from '@/components/common/Global.style';
import SectionMainHeading from '@/components/section-main-heading/SectionMainHeading';
import SectionHeading from '@/features/components/section-heading/SectionHeading';
import ProcessCard from '@/features/home/components/process-cards/ProcessCards';

import { ProcessMain, ProcessWrapper } from './HowItWorks.style';
import { SectionDescriptionText } from '../Home.style';

const processSteps = [

  {heading: 'Create Your Account',
    description: 'Sign up as a family and tell us about your household and care needs.',
    logoSrc: '/home/how-it-works/user-square.svg'
  },
  {heading: 'Find Your Perfect Helper',
    description: 'Browse profiles of verified Mom Helpers in your area and connect with them.',
    logoSrc: '/home/how-it-works/search.svg'
  },
  {heading: 'Schedule Service',
    description: 'Book on-demand assistance or schedule regular help based on your familys needs.',
    logoSrc: '/home/how-it-works/schduele.svg'
  },
  {heading: 'Simple Payment',
    description: 'Enjoy secure, automated payments after each session based on the helpers rate.',
    logoSrc: '/home/how-it-works/payment.svg',
  },

];

const HowItWorks: React.FC = () => {

  return (<>
    <ProcessMain>
      <AppContentWrapper >
        <ProcessWrapper>

          <Box sx={{ width: '50%' }}>

            <SectionHeading text="Process" align="start" marginBottom="23px" />
            <SectionMainHeading text="How It Works" />

            <SectionDescriptionText>
              Getting started with Full Steam Ahead is simple. Here&apos;s how you can find the perfect Mom Helper for your family.
            </SectionDescriptionText>  
          </Box>

          {/* <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          > */}

          <Box sx={{ display: 'flex', gap: '20px' , width: '50%' , overflowX:'hidden' }}>
            {processSteps.map((step, index) => (
              
              // <SwiperSlide key={index}>

              <ProcessCard
                key={index}
                index={`0${index + 1}`}
                heading={step.heading}
                description={step.description}
                logoSrc={step.logoSrc} />
              // </SwiperSlide>
            ) )}
            {/* </Swiper> */}
          </Box>
        </ProcessWrapper>

      </AppContentWrapper>
    </ProcessMain>
  </>);

};

export default HowItWorks;