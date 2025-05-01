import React from 'react';

import MomHelperCard from '@/components/dashboard/mom-helper-card/MomHelperCard';

import {
  SingleProfileContainer,
  SingleProfileDetailsContainer,
  DetailsBox,
  DetailsHeading,
  DetailsIntro,
} from './SingleProfile.style';

// Default profile image path
const DEFAULT_PROFILE_IMAGE = '/dashboard/dashboard-mom/profile-view-data/profilepic.png';

const popularServices =
{
  name: 'Bessie Cooper',
  workType: 'Babysitter',
  rating: 4,
  reviews: 10,
  lowerRate: 30,
  upperRate: 35,
  completedSessions: 5,
  profilePic: DEFAULT_PROFILE_IMAGE, // Use constant for default image
  verifed: true,
  banner: '/dashboard/dashboard-mom/profile-view-data/banner.svg',
  intro: `Hi! I'm Bessie Cooper, a caring and responsible babysitter with [X] years of experience providing safe, fun, and nurturing care for children of all ages. I prioritize creating a warm and engaging environment where kids feel comfortable, happy, and entertained.
Experience with: Infants, toddlers, and school-aged childrenSkills: Meal prep, bedtime routines, homework help, creative play, and safety-first supervisionCertifications: [First Aid, CPR, etc.]Availability: [Flexible hours, evenings, weekends]
I love engaging children in interactive activities, from storytelling to arts and crafts, while ensuring their safety and well-being. Parents trust me to be punctual, patient, and attentive to their childs needs.
Looking for a reliable babysitter? Lets chat!`,
};

export default function SingleProfile() {
  return (
    <SingleProfileContainer>
      <MomHelperCard name={popularServices.name}
        workType={popularServices.workType}
        rating={popularServices.rating}
        reviews={popularServices.reviews}
        lowerRate={popularServices.lowerRate}
        upperRate={popularServices.upperRate}
        completedSessions={popularServices.completedSessions}
        profilePic={popularServices.profilePic}
        verifed={popularServices.verifed}
        banner={popularServices.banner}
      />

      <SingleProfileDetailsContainer>
        <DetailsBox>
          <DetailsHeading>Meet {popularServices.name}</DetailsHeading>
          <DetailsIntro>{popularServices.intro}</DetailsIntro>
        </DetailsBox>
        <DetailsBox>
          <DetailsHeading>Services Offered</DetailsHeading>

        </DetailsBox>
      </SingleProfileDetailsContainer>
    </SingleProfileContainer>
  );
}