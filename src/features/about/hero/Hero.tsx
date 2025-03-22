
import { Box } from '@mui/material';

import { Button } from '@/components/buttons/Button.style';
import { AppContentWrapper } from '@/components/common/Global.style';
import SectionMainHeading from '@/components/section-main-heading/SectionMainHeading';
import SpecialButton from '@/components/specialButtons/SpecialButtons';
import SectionHeading from '@/features/components/section-heading/SectionHeading';
import { SectionDescriptionText } from '@/features/home/Home.style';

import { HeroWrapper,  ButtonsContianer } from './Hero.style';
import { Link } from '@/i18n/routing';

const specialButtons = [

  'Verified Helpers',
  'On Demand Services',
  'Flexible Scheduling',
  'Trusted Care'
];

const AboutHero: React.FC = () => {

  return (<>
    <AppContentWrapper>

      <HeroWrapper  >
        <Box sx={{display: 'flex', flexDirection: 'column' , alignItems: 'center', position: 'relative'}}>

          {specialButtons.map((button, index) => (
            <SpecialButton key={index} text={button} position index={index} buttonBox />     
          ))}
          <SectionHeading text="On-demand Family Support" align="start" marginBottom="23px" />
          <SectionMainHeading center text="Connecting busy families with " span="Certified Mom Helpers " text2="For on-demand assistance." />

          <SectionDescriptionText center>
            Full St3am Ahead (FSA) is a platform connecting busy parents and guardians with qualified and certified Mom Helpers. Our service provides on-demand and scheduled assistance, including childcare, meal prep, grocery runs, light housekeeping, pet minding, tutoring, and elderly check-ins all facilitated through our user-friendly mobile app. We prioritize safety and trust, requiring rigorous background checks and certifications for all our Mom Helpers. FSA empowers individuals to earn income flexibly while providing essential support to families in their communities.
          </SectionDescriptionText> 
          <ButtonsContianer>
            <Link href='/registeration-mom'>
            <Button
              special
              fontSize="16px"
              borderRadius="8px"
              width="253px"
              height="44px"
              > Find a Mom Helper
            </Button>
              </Link>
              <Link href='/registeration-mom-helper'>
            <Button
              fontSize="16px"
              borderRadius="8px"
              width="253px"
              height="44px"
              >
                             Become a Mom Helper
            </Button>
              </Link>
         
          </ButtonsContianer>

        </Box>
      </HeroWrapper>
    </AppContentWrapper>
  </>);

};

export default AboutHero;