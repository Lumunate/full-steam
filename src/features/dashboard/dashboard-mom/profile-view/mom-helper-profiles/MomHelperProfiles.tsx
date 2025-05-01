'use client';

import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import {FormControlLabel, CircularProgress, Typography} from '@mui/material';
import { Box } from '@mui/material';
import{ Checkbox }from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/buttons/Button.style';
import MomHelperCard from '@/components/dashboard/mom-helper-card/MomHelperCard';
import { ButtonContainer } from '@/components/dashboard/mom-helper-card/MomHelperCard.style';
import { useHelpers } from '@/hooks/useHelpers';

import { CheckbboxContainer , SortSubHeading, FlexColumnBox} from './MomHelperProfiles.style';
import { FilterOptions , FilterOption, FilterTypography} from './MomHelperProfiles.style';
import { SortByModal, SortByHeading } from './MomHelperProfiles.style';

const MomHelperBox = styled(Box)({
  display: 'flex',
  gap: '32px',
  flexWrap: 'wrap',
});

const checkBoxLabels: string[] = [
  'Recommended',
  'Price: Low to High',
  'Price: High to Low',
  'Highest Rating',
  'Most Experienced',
];

const services: string[] = [
  'All ratings',
  '4+ stars',
  '3+ stars',
];

const avalibilty: string[] = [
  'Available now',
  'Available weekends',
  'Available evenings',
];

// Default profile image path
const DEFAULT_PROFILE_IMAGE = '/dashboard/dashboard-mom/profile-view-data/profilepic.png';

export default function MomHelperProfiles() {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [isSortOpen, setIsSortOpen] = React.useState(false);
  const [checkedItems, setCheckedItems] = React.useState<boolean[]>(
    new Array(checkBoxLabels.length).fill(false)
  );
  
  const { helpers, isLoading, error } = useHelpers();

  const handleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCheckedItems = [...checkedItems];

    updatedCheckedItems[index] = event.target.checked;
    setCheckedItems(updatedCheckedItems);
  };

  const handleOpenfilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSortfilter = () => {
    setIsSortOpen(!isSortOpen);
  };

  const getProfilePicUrl = (image: string | null | undefined): string => {
    // Check if the image value exists and is not empty
    if (!image || typeof image !== 'string' || image.trim() === '') {
      return DEFAULT_PROFILE_IMAGE;
    }

    // For safety, try to validate the URL
    try {
      // If it's an absolute URL
      if (image.startsWith('http://') || image.startsWith('https://')) {
        // Simple URL validation - could be expanded
        return image;
      }
      
      // If it's a relative URL
      if (image.startsWith('/')) {
        return image;
      }
      
      // If we can't validate, use default
      return DEFAULT_PROFILE_IMAGE;
    } catch {

      return DEFAULT_PROFILE_IMAGE;
    }
  };

  return (
    <>
      <FilterOptions>
        <FilterOption>
          <Box sx={{display: 'flex'}} onClick={handleOpenfilter}>
            <Image src='/dashboard/dashboard-mom/filter-options/sorting.svg' alt='Sorting' width={24} height={24} />
            <FilterTypography>Sorting</FilterTypography>
          </Box>
          <SortByModal val={isFilterOpen}>
            <SortByHeading>Sort By</SortByHeading>
            <FlexColumnBox>
              {checkBoxLabels.map((label, index) => (
                <CheckbboxContainer key={label + index}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<RadioButtonCheckedIcon />}
                        checked={checkedItems[index]}
                        onChange={handleChange(index)}
                        color="primary"
                      />
                    }
                    label={label}
                  />
                </CheckbboxContainer>
              ))}
            </FlexColumnBox>
          </SortByModal>
        </FilterOption>
        <FilterOption>
          <Box sx={{display: 'flex'}} onClick={handleSortfilter}>
            <Image src='/dashboard/dashboard-mom/filter-options/filter.svg' alt='Filter' width={24} height={24} />
            <FilterTypography>Filter</FilterTypography>
          </Box>
          <SortByModal val={isSortOpen}>
            <SortByHeading>Filter Options</SortByHeading>
            <SortSubHeading>
              Services
            </SortSubHeading>
            <FlexColumnBox>
              {services.map((label, index) => (
                <FormControlLabel
                  key={label + index}
                  control={
                    <Checkbox
                      icon={<RadioButtonUncheckedIcon />}
                      checkedIcon={<RadioButtonCheckedIcon />}
                      checked={checkedItems[index]}
                      onChange={handleChange(index)}
                      color="primary"
                    />
                  }
                  label={label}
                />
              ))}
            </FlexColumnBox>
            <SortSubHeading>
              Availability
            </SortSubHeading>
            <FlexColumnBox>
              {avalibilty.map((label, index) => (
                <FormControlLabel
                  key={label + index}
                  control={
                    <Checkbox
                      icon={<CheckBoxOutlineBlankOutlinedIcon />}
                      checkedIcon={<CheckBoxOutlinedIcon />}
                      checked={checkedItems[index]}
                      onChange={handleChange(index)}
                      color="primary"
                    />
                  }
                  label={label}
                />
              ))}
            </FlexColumnBox>
            <ButtonContainer>
              <Button>Clear All</Button>
              <Button special>Apply</Button>
            </ButtonContainer>
          </SortByModal>
        </FilterOption>
      </FilterOptions>
      
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', p: 5 }}>
          <CircularProgress size={60} />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ p: 3 }}>
          Error loading helpers: {error.toString()}
        </Typography>
      ) : helpers.length === 0 ? (
        <Typography sx={{ p: 3 }}>
          No mom helpers available.
        </Typography>
      ) : (
        <MomHelperBox>
          {helpers.map((helper) => (
            <MomHelperCard
              key={helper.id}
              name={`${helper.firstName} ${helper.lastName || ''}`}
              workType={helper.shortBio?.split(',')[0] || 'Caregiver'}
              rating={helper.rating || 0}
              reviews={helper.services?.length || 0}
              lowerRate={helper.hourlyRate ? Number(helper.hourlyRate) - 5 : 25}
              upperRate={helper.hourlyRate ? Number(helper.hourlyRate) + 5 : 35}
              completedSessions={helper.packages?.length || 0}
              offeredServices={helper.services?.length || 0}
              packagesOffered={helper.packages?.length || 0}
              profilePic={getProfilePicUrl(helper.image)}
              verifed={helper.isApproved}
              banner={'/dashboard/dashboard-mom/profile-view-data/banner.svg'}
            />
          ))}
        </MomHelperBox>
      )}
    </>
  );
}