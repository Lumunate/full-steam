import { Box } from '@mui/material';

import FadeIn from '@/components/animations/FadeIn';
import { AppContentWrapper } from '@/components/common/Global.style';
import SectionMainHeading from '@/components/section-main-heading/SectionMainHeading';
import SectionHeading from '@/features/components/section-heading/SectionHeading';
import { SectionDescriptionText } from '@/features/home/Home.style';

const DayCareSpot: React.FC = () => {
  return (
    <>
      <AppContentWrapper>
        <FadeIn
          direction='up'
          duration={1.5}
          distance={100}
        
        >

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <SectionHeading
              text="Find Your Child's Perfect Daycare Spot"
              align='start'
              marginBottom='23px'
            />
            <SectionMainHeading
              center
              text='Daycare Spot '
              span='Interest & Availability'
            />

            <SectionDescriptionText center>
            Finding reliable and convenient daycare can be challenging. Full
            St3am Ahead simplifies this process by creating a comprehensive list
            of families seeking daycare in your area and providing a platform
            for daycares to advertise their available spots.
            </SectionDescriptionText>
          </Box>
        </FadeIn>

      </AppContentWrapper>
    </>
  );
};

export default DayCareSpot;
