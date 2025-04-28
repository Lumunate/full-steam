'use client';

import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import Image from 'next/image';
const popularServices =[
  {
    imgSrc: '/dashboard/dashboard-mom/service-icons/childcare.svg',
    service: 'Childcare'
  },
  {
    imgSrc: '/dashboard/dashboard-mom/service-icons/meal-preparation.svg',
    service: 'Meal Preparation'
  },
  {
    imgSrc: '/dashboard/dashboard-mom/service-icons/light-housekeeping.svg',
    service: 'Light Housekeeping'
  },
  {
    imgSrc: '/dashboard/dashboard-mom/service-icons/tutoring.svg',
    service: 'Tutoring'
  },
  {
    imgSrc: '/dashboard/dashboard-mom/service-icons/elderly-checkin.svg',
    service: 'Elderly Check-in'
  },
  {
    imgSrc: '/dashboard/dashboard-mom/service-icons/daycare-matching.svg',
    service: 'Daycare Matching'
  },
  {
    imgSrc: '/dashboard/dashboard-mom/service-icons/pet-minding.svg',
    service: 'Pet Minding'
  },
  {
    imgSrc: '/dashboard/dashboard-mom/service-icons/amazon.svg',
    service: 'Bringing Amazon packages'
  },
  {
    imgSrc: '/dashboard/dashboard-mom/service-icons/water-plants.svg',
    service: 'Water Plants'
  },
  {
    imgSrc: '/dashboard/dashboard-mom/service-icons/takingout-trash.svg',
    service: 'Taking Out Trash'
  },
  {
    imgSrc: '/dashboard/dashboard-mom/service-icons/snow-shoveling.svg',
    service: 'Snow Shoveling'
  },
];

const PopService = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: '1px solid #E8E8E8',
  borderRadius: '24px',
  padding: '16px',
  width: '172px',
}));

const PopTypography = styled(Typography)(() => ({
  fontSize: '16px',
  color: '#151515',
  fontWeight: 500,
  marginTop: '12px',
  textAlign: 'center',
  lineHeight: '100%',
}));

const PopHeading = styled(Typography)(() => ({  
  fontSize: '22px',
  color: '#151515',
  fontWeight: 400,
  marginBottom: '16px',
}));

export default function PopularService() {
  return (
    <>
      <PopHeading>Popular Services</PopHeading>
      <Box sx={{ display: 'flex',  gap: '12px', flexWrap: 'wrap' }}>

        {popularServices.map((service, index) => (
          <PopService key={index}>
            <Image src={service.imgSrc} alt={service.service} width={64} height={64} />
            <PopTypography>{service.service}</PopTypography>
          </PopService>
        ))}  
      </Box>
    </>
  );
}
