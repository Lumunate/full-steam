import { Box } from '@mui/material';
import Image from 'next/image';

import ImpressionCard from '@/components/about/impression-card/ImpressionCard';
import FadeIn from '@/components/animations/FadeIn';
import { AppContentWrapper } from '@/components/common/Global.style';
import SectionMainHeading from '@/components/section-main-heading/SectionMainHeading';
import SectionHeading from '@/features/components/section-heading/SectionHeading';

import { AboutSubHeading, AboutWrapper, FamilyDogImage } from './AboutAvalSpot.style';
import { ImpressionGrid } from './AboutAvalSpot.style';

const interests = [
  {
    imageurl: '/about/icons/map.svg',
    para: 'Enter your postal code to identify your area.',
  },
  {
    imageurl: '/about/icons/family-smile.svg',
    para: 'Specify the number of children requiring daycare.',
  },
  {
    imageurl: '/about/icons/calendar.svg',
    para: 'Indicate your desired start date for daycare services.',
  },
  {
    imageurl: '/about/icons/contact.svg',
    para: 'Submit your contact information (name, email, phone number).',
  },
];

const AboutAvalSpots: React.FC = () => {
  return (
    <Box sx={{ position: 'relative', marginTop: '100px' , width: '100%'}}>
      <FamilyDogImage
        src='/about/how-it-is-section/family-with-dog.png'
        height={557}
        width={895}
        alt='Light Bulb'
        
      />
      <AppContentWrapper sx={{ zIndex: 5 }}>
        <AboutWrapper
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end'
              }}
            >

              <SectionHeading
                text='How It Works'
                align='start'
                marginBottom='23px'
              />
              <SectionMainHeading
                marginbottom='0'
                text='For Daycares with '
                span='Available Spots'
              />
            </Box>
            <AboutSubHeading>Advertise Your Availability</AboutSubHeading>
            <ImpressionGrid>
              {interests.map((interest, index) => (
                <FadeIn
                  key={index}
                  direction='up'
                  distance={200}
                  duration={1.5}
                >

                  <ImpressionCard
                    text={interest.para}
                    imageUrl={interest.imageurl}
                  />
                </FadeIn>
              ))}
            </ImpressionGrid>
            <Image
              src='/about/how-it-is-section/sucess-together.png'
              height={272}
              width={272}
              alt='Light Bulb'
              style={{
                position: 'absolute',
                zIndex: 0,
                top: '62%',
                right: '-10%',
              }}
            />
            <AboutSubHeading>Monthly Advertising Fee</AboutSubHeading>
            <FadeIn>

              <ImpressionCard
                text='Daycares can list their available spots for a $10 monthly fee, which covers promotion to interested families and helps maintain the platform.'
                imageUrl='/about/icons/map.svg'
              />
            </FadeIn>
          </Box>
        </AboutWrapper>
      </AppContentWrapper>
    </Box>
  );
};

export default AboutAvalSpots;
