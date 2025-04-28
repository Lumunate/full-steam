import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import {FormControlLabel} from '@mui/material';
import { Box } from '@mui/material';
import{ Checkbox }from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/buttons/Button.style';
import MomHelperCard from '@/components/dashboard/mom-helper-card/MomHelperCard';
import { ButtonContainer } from '@/components/dashboard/mom-helper-card/MomHelperCard.style';

import { CheckbboxContainer , SortSubHeading, FlexColumnBox} from './MomHelperProfiles.style';
import { FilterOptions , FilterOption, FilterTypography} from './MomHelperProfiles.style';
import { SortByModal, SortByHeading } from './MomHelperProfiles.style';
const MomHelperBox = styled(Box)({
  display: 'flex',
  gap: '32px',
  flexWrap: 'wrap',
});

const popularServices =[
  {
    name: 'Bessie Cooper',
    workType: 'Babysitter',
    rating: 4,
    reviews: 10,
    lowerRate: 30,
    upperRate: 35,
    completedSessions: 5,
    offeredServices: 2,
    packagesOffered: 5,
    profilePic: '/dashboard/dashboard-mom/profile-view-data/profilepic.png',
    verifed: true,
    banner: '/dashboard/dashboard-mom/profile-view-data/banner.svg',
  },
  {
    name: 'Arnold',
    workType: 'Babysitter',
    rating: 5,
    reviews: 3,
    lowerRate: 10,
    upperRate: 25,
    completedSessions: 1,
    offeredServices: 4,
    packagesOffered: 5,
    profilePic: '/dashboard/dashboard-mom/profile-view-data/profilepic.png',
    verifed: true,
    banner: '/dashboard/dashboard-mom/profile-view-data/banner.svg',
  },
  {
    name: 'Bessie Cooper',
    workType: 'Babysitter',
    rating: 5,
    reviews: 3,
    lowerRate: 10,
    upperRate: 25,
    completedSessions: 1,
    offeredServices: 4,
    packagesOffered: 5,
    profilePic: '/dashboard/dashboard-mom/profile-view-data/profilepic.png',
    verifed: true,
    banner: '/dashboard/dashboard-mom/profile-view-data/banner.svg',
  },
  {
    name: 'Bessie Cooper',
    workType: 'Babysitter',
    rating: 5,
    reviews: 3,
    lowerRate: 10,
    upperRate: 25,
    completedSessions: 1,
    offeredServices: 4,
    packagesOffered: 5,
    profilePic: '/dashboard/dashboard-mom/profile-view-data/profilepic.png',
    verifed: true,
    banner: '/dashboard/dashboard-mom/profile-view-data/banner.svg',
  },
];

const checkBoxLabels: string[] = [
  'Recommended',
  'Price: Low to High',
  'Price: Low to High',
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

export default function MomHelperProfiles() {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [isSortOpen, setIsSortOpen] = React.useState(false);
  const [checkedItems, setCheckedItems] = React.useState<boolean[]>(
    new Array(checkBoxLabels.length).fill(false)
  );

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

  return (
    <>
      <FilterOptions>
        <FilterOption >

          <Box sx={{display: 'flex'}} onClick={handleOpenfilter}>

            <Image src='/dashboard/dashboard-mom/filter-options/sorting.svg' alt='Sorting' width={24} height={24} />
            <FilterTypography>Sorting</FilterTypography>
          </Box>
          <SortByModal val={isFilterOpen}>
            <SortByHeading>Sort By</SortByHeading>

            <FlexColumnBox>
              {checkBoxLabels.map((label, index) => (
                <CheckbboxContainer
                  key={label + index}
                >

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
        <FilterOption >
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
              Avalability
            </SortSubHeading>
            <FlexColumnBox>

              {avalibilty.map((label, index) => (
              
                <FormControlLabel
                  key={label + index}
                  control={
                    <Checkbox
                      icon={<CheckBoxOutlinedIcon />}
                      checkedIcon={<CheckBoxOutlineBlankOutlinedIcon />}
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
      <MomHelperBox>

        {popularServices.map((service, index) => (
          <MomHelperCard
            key={index}
            name={service.name}
            workType={service.workType}
            rating={service.rating}
            reviews={service.reviews}
            lowerRate={service.lowerRate}
            upperRate={service.upperRate}
            completedSessions={service.completedSessions}
            offeredServices={service.offeredServices}
            packagesOffered={service.packagesOffered}
            profilePic={service.profilePic}
            verifed={service.verifed}
            banner={service.banner} />
        
        ))}
      
      </MomHelperBox>
    </>
  );
}
