'use client';

import Image from 'next/image';

import {
  AnalysticHeadingBox,
  AnalysticCard,
  AnalysticsHeading,
  AnalysticsCardBox,
  AnalysticsStatsHeading,
  AnalysticStatsTypography,
  AnalysticPercentageTypography
} from './Analystics.style';
const analystics = [
  {
    heading: 'Total Sessions',
    iconURl: '/dashboard/dashboard-overview/analystics/calender.svg',
    stats: 248,
    percentageIncrease: '+12% from last month',
  },
  {
    heading: 'Total Earnings',
    iconURl: '/dashboard/dashboard-overview/analystics/dollar.svg',
    stats: '$ 4,520',
    percentageIncrease: '+8% from last month',
  },
  {
    heading: 'Rating',
    iconURl: '/dashboard/dashboard-overview/analystics/star.svg',
    stats: '4.8/5',
    percentageIncrease: 'Based on 156 reviews',
  },
  {
    heading: 'Hours Worked',
    iconURl: '/dashboard/dashboard-overview/analystics/clock.svg',
    stats: '386h',
    percentageIncrease: '+15% from last month',
  },
];

export default function AnalysticsSection() {
  return (
    <>
      <AnalysticsHeading>Analystics</AnalysticsHeading>
      <AnalysticsCardBox>
        {analystics.map((analystic, index) => (
          <AnalysticCard key={index}>
            <AnalysticHeadingBox>
              <AnalysticsStatsHeading>
                {analystic.heading}
              </AnalysticsStatsHeading>
              <Image
                src={analystic.iconURl}
                alt={`${analystic.heading} icon`}
                height={16}
                width={16}
              />
            </AnalysticHeadingBox>
            <AnalysticStatsTypography>

              {analystic.stats}
            </AnalysticStatsTypography>
            <AnalysticPercentageTypography>{analystic.percentageIncrease}</AnalysticPercentageTypography>
          </AnalysticCard>
        ))}
      </AnalysticsCardBox>
    </>
  );
}
