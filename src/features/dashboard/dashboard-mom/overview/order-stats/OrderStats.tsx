'use client';
import Image from 'next/image';

import { AnalysticCard, AnalysticStatsTypography , AnalysticsStatsHeading , AnalysticHeadingBox , } from '@/features/dashboard/dashboard-mom-helper/dashboard-overview/analysics/Analystics.style';

import { OrderStatBox } from './OrderStats.style';

const orderStats = [

  {
        
    heading: 'Upcoming Orders',
    stats: 2,
    iconURl: '/dashboard/dashboard-overview/analystics/calender.svg',
  },
  {
    heading: 'Completed Orders',
    stats: 2,
    iconURl: '/dashboard/dashboard-overview/analystics/dollar.svg',
  },
  {
    heading: 'Cancelled Orders',
    stats: 1,
    iconURl: '/dashboard/dashboard-overview/analystics/dollar.svg',
  },
];

export default function OrderStats() {
  return (
    <>

      <OrderStatBox>
        {orderStats.map((analystic, index) => (
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
          </AnalysticCard>
        ))}
      </OrderStatBox>
    
    </>);
}
