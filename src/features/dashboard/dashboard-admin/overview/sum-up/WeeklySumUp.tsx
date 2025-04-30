'use client';

import { Box, CircularProgress } from '@mui/material';
import Image from 'next/image';

import { useAdminStats } from '@/hooks/useAdminStats';

import {
  AnalysticHeadingBox,
  AnalysticCard,
  AnalysticsHeading,
  AnalysticsCardBox,
  AnalysticsStatsHeading,
  AnalysticStatsTypography,
  AnalysticPercentageTypography
} from './WeeklySumUp.style';

export default function WeeklySumUp() {
  const { data: stats, isLoading } = useAdminStats();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  const analyticsData = [
    {
      heading: 'Active Users',
      iconURl: '/dashboard/dashboard-overview/analystics/calender.svg',
      stats: stats?.activeUsers || 0,
      percentageIncrease: '+12% from last month',
    },
    {
      heading: 'Total Earnings',
      iconURl: '/dashboard/dashboard-overview/analystics/dollar.svg',
      stats: `$ ${stats?.totalEarnings || 0}`,
      percentageIncrease: '+8% from last month',
    },
    {
      heading: 'Platform Commisons (20%)',
      iconURl: '/dashboard/dashboard-overview/analystics/dollar.svg',
      stats: `$${stats?.platformCommissions || 0}`,
      percentageIncrease: '+8% from last month',
    },
    {
      heading: 'Application Requests',
      iconURl: '/dashboard/star.svg',
      stats: stats?.applicationRequests || 0,
      percentageIncrease: '+12% from last month',
    },
    {
      heading: 'Hours Worked',
      iconURl: '/dashboard/dashboard-overview/analystics/clock.svg',
      stats: `${stats?.hoursWorked || 0}h`,
      percentageIncrease: '+15% from last month',
    },
  ];

  return (
    <>
      <AnalysticsHeading>Weekly SumUp</AnalysticsHeading>
      <AnalysticsCardBox>
        {analyticsData.map((analytic, index) => (
          <AnalysticCard key={index}>
            <AnalysticHeadingBox>
              <AnalysticsStatsHeading>
                {analytic.heading}
              </AnalysticsStatsHeading>
              <Image
                src={analytic.iconURl}
                alt={`${analytic.heading} icon`}
                height={16}
                width={16}
              />
            </AnalysticHeadingBox>
            <AnalysticStatsTypography>
              {analytic.stats}
            </AnalysticStatsTypography>
            <AnalysticPercentageTypography>{analytic.percentageIncrease}</AnalysticPercentageTypography>
          </AnalysticCard>
        ))}
      </AnalysticsCardBox>
    </>
  );
}