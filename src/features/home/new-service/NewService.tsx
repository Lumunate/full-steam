import { Box } from '@mui/material';
import Image from 'next/image';

import { Button } from '@/components/buttons/Button.style';
import { AppContentWrapper } from '@/components/common/Global.style';
import SectionDescription from '@/components/section-description/SectionDescription';
import SectionHeading from '@/components/section-heading/SectionHeading';
import SectionMainHeading from '@/components/section-main-heading/SectionMainHeading';

import { NewServiceWrapper, HeroDesriptionHolder } from './NewService.style';
import { ServiceCheckList } from './NewService.style';
const checkList =[
  'Express interest in daycare spots in your area',
  'Be the first to know when spots become available',
  'Connect directly with daycares that match your needs',
  'Simple one-time registration fee of just $2',
];

const NewService: React.FC = () => {

  return (<>
    <AppContentWrapper>

      <NewServiceWrapper sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >

        <Box >

          <SectionHeading text='New Service' align="start" marginBottom="23px" />
          <SectionMainHeading text="Find Your Child's" span="Perfect Daycare Spot" />
          <HeroDesriptionHolder>

            <SectionDescription  text="Struggling to find reliable daycare? Join our waitlist service to be notified when spots become available in your area." />
            <Box sx={{margin: '40px 0'}}>

              {checkList.map((item, index) => ( 
                <ServiceCheckList key={index}  >
                  <Image src="/home/new-service/tick-circle.svg" alt="checkmark" width={30} height={30} />
                  {item}
                </ServiceCheckList>
              ))}
            </Box>
           
            <Button
              special
              fontSize="16px"
              borderRadius="8px"
              width="380px"
              height="44px"
            >
Learn More About Daycare Matching
            </Button>
         
          </HeroDesriptionHolder>

        </Box>
        <Box >
          <Image src="/home/daycare-spot.png" alt="hero-image" width={615} height={327} />

        </Box>

      </NewServiceWrapper>
    </AppContentWrapper>
  </>);

};

export default NewService;