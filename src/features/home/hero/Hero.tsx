import { Box } from '@mui/material';
import Image from 'next/image';

import FadeIn from '@/components/animations/FadeIn';
import { Button } from '@/components/buttons/Button.style';
import { AppContentWrapper } from '@/components/common/Global.style';
import SectionMainHeading from '@/components/section-main-heading/SectionMainHeading';
import SpecialButton from '@/components/specialButtons/SpecialButtons';
import StatHolder from '@/components/statholder/StatHolder';
import SectionHeading from '@/features/components/section-heading/SectionHeading';
import { Link } from '@/i18n/routing';

import { HeroImage } from './Hero.style';
import {
  HeroWrapper,
  HeroDesriptionHolder,
  ButtonsContianer,
  ButtonsGrid,
} from './Hero.style';
import { SectionDescriptionText } from '../Home.style';
const specialButtons = [
  'Verified Helpers',
  'On Demand Services',
  'Flexible Scheduling',
  'Trusted Care',
];

const Hero: React.FC = () => {
  return (
    <>
      <AppContentWrapper>
        <HeroWrapper
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <FadeIn direction='left' distance={200} duration={1.5}>
            <Box>
              <SectionHeading
                text='On-demand Family Support'
                align='start'
                marginBottom='23px'
              />
              <SectionMainHeading text="Your Family's " span='Perfect Helper' />
              <HeroDesriptionHolder>
                <SectionDescriptionText>
                  Connecting busy families with certified Mom Helpers for
                  childcare, meal prep, housekeeping, and more
                </SectionDescriptionText>
                <ButtonsContianer>
                  <Link href='/registeration-mom'>
                    <Button
                      special
                      fontSize='16px'
                      borderRadius='8px'
                      width='253px'
                      height='44px'
                    >
                      Find a Mom Helper
                    </Button>
                  </Link>

                  <Link href='/registeration-mom-helper'>
                    <Button
                      fontSize='16px'
                      borderRadius='8px'
                      width='253px'
                      height='44px'
                    >
                      Become a Mom Helper
                    </Button>
                  </Link>
                </ButtonsContianer>
                <ButtonsGrid>
                  {specialButtons.map((button, index) => (
                    <SpecialButton arrow={false} key={index} text={button} />
                  ))}
                </ButtonsGrid>
              </HeroDesriptionHolder>
            </Box>
          </FadeIn>

          <FadeIn direction='right' distance={200} duration={1.5} width={50}>
            <Box
              sx={{
                position: 'relative',
                '@media (max-width: 600px)': {
                  width: '100%',
                },
              }}
            >
              <StatHolder
                text1='Background Verified'
                text2='Trusted And Certified'
                imgSrc='/home/tick-circle.svg'
                top={35}
                left={-20}
                yes={true}
              />
              <HeroImage
                src='/home/family.png'
                alt='hero-image'
                width={570}
                height={527}
              />
              <StatHolder
                text1='500+ Families'
                text2='Trust Us'
                imgSrc='/home/user-square.svg'
                top={75}
                right={-5}
              />
            </Box>
          </FadeIn>
        </HeroWrapper>
      </AppContentWrapper>
    </>
  );
};

export default Hero;
