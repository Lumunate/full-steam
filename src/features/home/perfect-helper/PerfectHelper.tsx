
import { Box } from '@mui/material';
import Image from 'next/image';

import { Button } from '@/components/buttons/Button.style';
import { AppContentWrapper } from '@/components/common/Global.style';
import SectionDescription from '@/components/section-description/SectionDescription';
import SectionMainHeading from '@/components/section-main-heading/SectionMainHeading';

import { PerfectHelperWrapper, PerfectHelperOverlay, HelperTypography } from './PerfectHelper.style';
import { ContentWrapper } from './PerfectHelper.style';

const PerfectHelper: React.FC = () => {

  return (<>
    <PerfectHelperWrapper>
      <PerfectHelperOverlay>

        <AppContentWrapper>
          <ContentWrapper>

            <SectionMainHeading text='Ready to Find Your Perfect Helper?' color='white' />
            <SectionDescription  color="white" text='Join thousands of families who have discovered the perfect support system with Full Steam Ahead.' />
          </ContentWrapper>
          <Box sx={{display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'center', marginTop: '10px'}}>

            <Box sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <HelperTypography>
  For Families
              </HelperTypography>
              <Button
                special
                fontSize="16px"
                borderRadius="8px"
                width="281px"
                height="37px"
              >
                <Image  src='/icons/user-add.svg' width={24} height={24} alt='add-user' />
  Sign Up as a Family
              </Button>
              <Button
                fontSize="16px"
                borderRadius="8px"
                width="281px"
                height="37px"
              >
                <Image src='/icons/login.svg' width={24} height={24} alt='login' />
  Family Login
              </Button>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>

              <HelperTypography>
  For Mom Helper
              </HelperTypography>
              <Button
                special
                fontSize="16px"
                borderRadius="8px"
                width="281px"
                height="37px"
              >
                <Image src='/icons/user-add.svg' width={24} height={24} alt='add-user' />
    Become a Mom Helper
              </Button>

              <Button
                fontSize="16px"
                borderRadius="8px"
                width="281px"
                height="37px"
              >
                <Image src='/icons/login.svg' width={24} height={24} alt='login' />
    Mom Helper Login
              </Button>

            </Box>
          </Box>
        </AppContentWrapper>
      </PerfectHelperOverlay>
    </PerfectHelperWrapper>
  </>);

};

export default PerfectHelper;