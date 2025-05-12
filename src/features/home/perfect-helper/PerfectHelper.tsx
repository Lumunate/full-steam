import { Box } from '@mui/material';
import Image from 'next/image';

import { Button } from '@/components/buttons/Button.style';
import { AppContentWrapper } from '@/components/common/Global.style';
import SectionMainHeading from '@/components/section-main-heading/SectionMainHeading';
import { Link } from '@/i18n/routing';

import {
  PerfectHelperWrapper,
  PerfectHelperOverlay,
  HelperTypography,
  PerfectHelperButtonsBox,
  PerfectHelperBoxButton
} from './PerfectHelper.style';
import { ContentWrapper } from './PerfectHelper.style';
import { SectionDescriptionText } from '../Home.style';

const PerfectHelper: React.FC = () => {
  return (
    <>
      <PerfectHelperWrapper>
        <PerfectHelperOverlay sx={{display: 'flex' , alignItems: 'center'}}>
          <AppContentWrapper  >
            <ContentWrapper sx={{paddingTop: 0}}>
              <SectionMainHeading
                text='Ready to Find Your Perfect Helper?'
                color='white'
              />
              <SectionDescriptionText color='white'>
                Join thousands of families who have discovered the perfect
                support system with Full St3am Ahead.
              </SectionDescriptionText>
            </ContentWrapper>
            <PerfectHelperButtonsBox
             
            >
              <PerfectHelperBoxButton
              >
                <HelperTypography>For Families</HelperTypography>
                <Link href='/registeration-mom'>
                  <Button
                    special
                    fontSize='16px'
                    borderRadius='8px'
                    width='281px'
                    height='37px'
                  >
                    <Image
                      src='/icons/user-add.svg'
                      width={24}
                      height={24}
                      alt='add-user'
                    />
                    Sign Up as a Family
                  </Button>
                </Link>
                <Link href='/login?role=mom'>
                  <Button
                    fontSize='16px'
                    borderRadius='8px'
                    width='281px'
                    height='37px'
                  >
                    <Image
                      src='/icons/login.svg'
                      width={24}
                      height={24}
                      alt='login'
                    />
                    Family Login
                  </Button>
                </Link>
              </PerfectHelperBoxButton>
              <PerfectHelperBoxButton
              >
                <HelperTypography>For Mom Helper</HelperTypography>
                <Link href='/registeration-mom-helper'>
                  <Button
                    special
                    fontSize='16px'
                    borderRadius='8px'
                    width='281px'
                    height='37px'
                  >
                    <Image
                      src='/icons/user-add.svg'
                      width={24}
                      height={24}
                      alt='add-user'
                    />
                    Become a Mom Helper
                  </Button>
                </Link>

                <Link href='/login?role=mom-helper'>
                  <Button
                    fontSize='16px'
                    borderRadius='8px'
                    width='281px'
                    height='37px'
                  >
                    <Image
                      src='/icons/login.svg'
                      width={24}
                      height={24}
                      alt='login'
                    />
                    Mom Helper Login
                  </Button>
                </Link>
              </PerfectHelperBoxButton>
            </PerfectHelperButtonsBox>
          </AppContentWrapper>
        </PerfectHelperOverlay>
      </PerfectHelperWrapper>
    </>
  );
};

export default PerfectHelper;
