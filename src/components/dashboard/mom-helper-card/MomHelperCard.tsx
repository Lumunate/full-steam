'use client';

import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';

import { Button } from '@/components/buttons/Button.style';
import { RatingTypography } from '@/components/dashboard/mom-helper-card/MomHelperCard.style';

import {
  MomHelperCardContainer,
  MomHelperBanner,
  MomHelperProfileImage,
  MomHelperName,
  LookingForTypography,
  StartingTypography,
  PricesTypography,
  PriceHr,
  OfferedTypography,
} from './MomHelperCard.style';
import { ButtonContainer } from './MomHelperCard.style';

interface MomHelperCardProps {
  name: string;
  workType: string;
  rating: number;
  reviews: number;
  lowerRate: number;
  upperRate: number;
  completedSessions: number;
  offeredServices?: number;
  packagesOffered?: number;
  profilePic: string;
  verifed: boolean;
  banner: string;
}

// Added helper function to check Cloudinary URLs
const isCloudinaryUrl = (url: string): boolean => {
  return typeof url === 'string' && url.includes('res.cloudinary.com');
};

// Default profile image to use as fallback
const DEFAULT_PROFILE_PIC = '/dashboard/dashboard-mom/profile-view-data/profilepic.png';

const MomHelperCard: React.FC<MomHelperCardProps> = ({
  name,
  workType,
  rating,
  reviews,
  lowerRate,
  upperRate,
  completedSessions,
  offeredServices,
  packagesOffered,
  profilePic,
  verifed,
  banner,
}) => {
  // Make sure profilePic has a valid value
  const imageUrl = profilePic && profilePic.trim() !== '' ? profilePic : DEFAULT_PROFILE_PIC;

  const filledStars = [];
  const unfilledStars = [];

  for (let i = 0; i < rating; i++) {
    filledStars.push(
      <Image
        key={`filled-${i}`}
        src='/icons/star.svg'
        alt='Filled Star'
        width={30}
        height={30}
      />,
    );
  }

  for (let i = 0; i < 5 - rating; i++) {
    unfilledStars.push(
      <Image
        key={`unfilled-${i}`}
        src='/icons/unfilled-star.svg'
        alt='Unfilled Star'
        width={30}
        height={30}
      />,
    );
  }

  // Create a custom profile image component that handles Cloudinary URLs
  const ProfileImage = () => {
    if (isCloudinaryUrl(imageUrl)) {
      return (
        <Avatar
          alt={name}
          src={imageUrl}
          sx={{
            width: 90,
            height: 90,
          // padding: '12px',
          // borderRadius: '50%',
          // backgroundColor: 'white',
          // position: 'relative',
          // zIndex: 1,
          // '& img': {
          //   objectFit: 'cover',
          //   width: '100%',
          //   height: '100%',
          // },
          }}
        />
      );
    }
    
    return (
      <MomHelperProfileImage
        src={imageUrl}
        alt={name}
        height={100}
        width={100}
      />
    );
  };

  return (
    <>
      <MomHelperCardContainer>
        <MomHelperBanner src={banner} alt={name} height={131} width={424} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '50px',
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {/* Use the conditional ProfileImage component */}
            <ProfileImage />
            {verifed && (
              <Image
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: '5px',
                  zIndex: 10,
                }}
                src='/dashboard/dashboard-mom/profile-view-data/verify.svg'
                alt='verified'
                height={32}
                width={32}
              />
            )}
          </Box>
          <MomHelperName>{name}</MomHelperName>
        </Box>
        <LookingForTypography>
          Looking for Work as a {workType}
        </LookingForTypography>
        <Box sx={{ display: 'flex', gap: '8px', marginTop: '16px' , alignItems: 'center' , justifyContent: 'space-between'}}>

          <Box sx={{ display: 'flex', gap: '12px' , alignItems: 'center'}}>
            {filledStars}
            {unfilledStars}
            <RatingTypography>

              {rating.toFixed(1)} 
            </RatingTypography>
          </Box>
          <RatingTypography>

          ({reviews} reviews)
          </RatingTypography>
          
        </Box>

        <Image style={{marginTop: '13px'}} src='/dashboard/dashboard-mom/profile-view-data/fav.svg' alt='favourite' height={20} width={20} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box >
            <StartingTypography>Starting from</StartingTypography>
            <PriceHr>
              <PricesTypography>${lowerRate}-{upperRate}</PricesTypography>/hr
            </PriceHr>
            {offeredServices &&
              <OfferedTypography>
                {offeredServices} Services Offered
              </OfferedTypography> }
            
          </Box>
          <Box>

            <StartingTypography>Sessions Completed</StartingTypography>
            <PricesTypography sx={{textAlign: 'right'}}>{completedSessions}</PricesTypography>
            {packagesOffered && 
            <OfferedTypography>
              {packagesOffered} Packages Offered
            </OfferedTypography>
            }
          </Box>
        </Box>

        <ButtonContainer>
          <Button width='182px'>Chat</Button>
          <Button width='182px' special>
            Hire
          </Button>
        </ButtonContainer>
      </MomHelperCardContainer>
    </>
  );
};

export default MomHelperCard;