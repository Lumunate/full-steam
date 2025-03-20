import { Box } from '@mui/material';
import Image from 'next/image';

import { AppContentWrapper } from '@/components/common/Global.style';
import SectionDescription from '@/components/section-description/SectionDescription';
import SectionMainHeading from '@/components/section-main-heading/SectionMainHeading';
import SpecialButton from '@/components/specialButtons/SpecialButtons';
import StatHolder from '@/components/statholder/StatHolder';

import { HeroWrapper, HeroDesriptionHolder, ButtonsContianer, ButtonsGrid } from './Hero.style';

import { Button } from '@/components/buttons/Button.style';
import SectionHeading from '@/components/section-heading/SectionHeading';

const specialButtons = [

  'Verified Helpers',
  'On Demand Services',
  'Flexible Scheduling',
  'Trusted Care'
];

const Hero: React.FC = () => {

  return (<>
    <AppContentWrapper>

      <HeroWrapper sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >

        <Box >

          <SectionHeading text="On-demand Family Support" align="start" marginBottom="23px" />
          <SectionMainHeading text="Your Family's" span="Perfect Helper" />
          <HeroDesriptionHolder>

            <SectionDescription text="Connecting busy families with certified Mom Helpers for childcare, meal prep, housekeeping, and more." />
            <ButtonsContianer>
              <Button
                special
                fontSize="16px"
                borderRadius="8px"
                width="253px"
                height="44px"
              >
                             Find a Mom Helper
              </Button>
              <Button
                fontSize="16px"
                borderRadius="8px"
                width="253px"
                height="44px"
              >
                             Become a Mom Helper
              </Button>
         
            </ButtonsContianer>
            <ButtonsGrid>
              {specialButtons.map((button, index) => (
                <SpecialButton key={index} text={button} />
                
              ))}

            </ButtonsGrid>
          </HeroDesriptionHolder>

        </Box>
        <Box sx={{ position: 'relative' }}>
          <StatHolder   text1='Background Verified' text2='Trusted And Certified' imgSrc='/home/tick-circle.svg' top="25%" left="-35%" />
          <Image src="/home/family.png" alt="hero-image" width={570} height={527} />
          <StatHolder text1='Background Verified' text2='Trusted And Certified' imgSrc='/home/user-square.svg' top="75%" left="75%" />

        </Box>

      </HeroWrapper>
    </AppContentWrapper>
  </>);

};

export default Hero;