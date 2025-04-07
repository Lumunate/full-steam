import { Box } from '@mui/material';
import Image from 'next/image';

import ImpressionCard from '@/components/about/impression-card/ImpressionCard';
import { AppContentWrapper } from '@/components/common/Global.style';
import SectionMainHeading from '@/components/section-main-heading/SectionMainHeading';
import SectionHeading from '@/features/components/section-heading/SectionHeading';

import { AboutSubHeading, AboutWrapper } from './AboutHowItWorks.style';
import { ImpressionGrid } from './AboutHowItWorks.style';

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

const AboutHowItWorks: React.FC = () => {
  return (
    <Box sx={{ position: 'relative' }}>
      <AppContentWrapper>
        <AboutWrapper>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <SectionHeading
              text='How It Works'
              align='start'
              marginBottom='23px'
            />
            <SectionMainHeading
              marginbottom='0'
              text='For Families '
              span='Seeking Daycare'
            />
            <Image
              src='/about/how-it-is-section/idea-bulb.png'
              height={275}
              width={265}
              alt='Light Bulb'
              style={{ position: 'absolute', zIndex: 0, left: '-22%' }}
            />
            <AboutSubHeading sx={{ zIndex: 10 }}>
              Express Your Interest
            </AboutSubHeading>
            <ImpressionGrid>
              {interests.map((interest, index) => (
                <ImpressionCard
                  key={index}
                  text={interest.para}
                  imageUrl={interest.imageurl}
                />
              ))}
            </ImpressionGrid>
            <Image
              src='/about/how-it-is-section/payment-bill.png'
              height={272}
              width={272}
              alt='Light Bulb'
              style={{
                position: 'absolute',
                zIndex: 0,
                top: '50%',
                right: '-18%',
              }}
            />
            <AboutSubHeading>Nominal Sponsorship Fee</AboutSubHeading>
            <ImpressionCard
              text='A one-time fee of $2.00 ensures genuine interest and helps us maintain the waitlist and notification system.'
              imageUrl='/about/icons/payment-credit-card.svg'
            />
            <Image
              src='/about/how-it-is-section/notification.png'
              height={272}
              width={272}
              alt='Light Bulb'
              style={{
                position: 'absolute',
                zIndex: 0,
                bottom: '1%',
                left: '-24%',
              }}
            />
            <AboutSubHeading>Get Notified</AboutSubHeading>
            <ImpressionCard
              text='When a daycare spot becomes available in your area, we will notify you with details and contact information.'
              imageUrl='/about/icons/notification.svg'
            />
          </Box>
        </AboutWrapper>
      </AppContentWrapper>
      <Image
        src='/about/how-it-is-section/parents-with-child.png'
        height={862}
        width={783}
        alt='Light Bulb'
        style={{ position: 'absolute', zIndex: 0, top: '0', right: '0' }}
      />
    </Box>
  );
};

export default AboutHowItWorks;
