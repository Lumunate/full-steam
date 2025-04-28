
import Image from 'next/image';

import {
  AnalysticHeadingBox,
  AnalysticCard,
  AnalysticsHeading,
  AnalysticsCardBox,
  AnalysticsStatsHeading,
  AnalysticStatsTypography,
  AnalysticPercentageTypography
} from './WeeklySumUp.style';

const analystics = [
  {
    heading: 'Active Users',
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
    heading: 'Paltform Commisons (20%)',
    iconURl: '/dashboard/dashboard-overview/analystics/dollar.svg',
    stats: '$1,200',
    percentageIncrease: '+8% from last month',
  },
  {
    heading: 'Application Requests',
    iconURl: '/dashboard/star.svg',
    stats: '248',
    percentageIncrease: '+12% from last month',
  },
  {
    heading: 'Hours Worked',
    iconURl: '/dashboard/dashboard-overview/analystics/clock.svg',
    stats: '386h',
    percentageIncrease: '+15% from last month',
  },
];

export default function WeeklySumUp() {
  return (
    <>
      <AnalysticsHeading>Weekly SumUp</AnalysticsHeading>
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
