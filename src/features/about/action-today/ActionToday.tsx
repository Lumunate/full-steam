import { Box } from '@mui/material';
import Image from 'next/image';

import { Button } from '@/components/buttons/Button.style';
import { AppContentWrapper } from '@/components/common/Global.style';
import SectionMainHeading from '@/components/section-main-heading/SectionMainHeading';
import { SectionDescriptionText } from '@/features/home/Home.style';
import {
  PerfectHelperWrapper,
  PerfectHelperOverlay,
  HelperTypography,
  ContentWrapper,
  ColumnBox
} from '@/features/home/perfect-helper/PerfectHelper.style';
import { Link } from '@/i18n/routing';
const ActionToday: React.FC = () => {
  return (
    <>
      <PerfectHelperWrapper>
        <PerfectHelperOverlay>
          <AppContentWrapper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <ContentWrapper>
              <SectionMainHeading text='Take Action Today!' color='white' />
              <SectionDescriptionText color='white' fontSize='18px'>
                Join thousands of families who have discovered the perfect
                support system with Full St3am Ahead.
              </SectionDescriptionText>
            </ContentWrapper>
            <ColumnBox
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                justifyContent: 'center',
                marginTop: '10px',
                maxWidth: '281px',
                paddingBottom: {
                  lg: '200px'
                }
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Image
                  src='/about/action-today/family-4.svg'
                  height={60}
                  width={60}
                  alt='Family of 4'
                />
                <HelperTypography>
                  Families: Register your interest today and take the first step
                  toward securing your child&apos;s daycare spot.
                </HelperTypography>
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
                    Register as a Family
                  </Button>
                </Link>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Image
                  src='/about/action-today/medical-care.svg'
                  height={60}
                  width={60}
                  alt='Family of 4'
                  style={{objectFit: 'cover'}}
                />

                <HelperTypography>
                  Daycares: Advertise your available spots and connect with
                  families in need.
                </HelperTypography>
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
                    Register as a Daycare
                  </Button>
                </Link>
              </Box>
            </ColumnBox>
          </AppContentWrapper>
        </PerfectHelperOverlay>
      </PerfectHelperWrapper>
    </>
  );
};

export default ActionToday;
