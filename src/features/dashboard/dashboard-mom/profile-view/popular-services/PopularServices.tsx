'use client';

import { CircularProgress, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import Image from 'next/image';

import { useServices } from '@/hooks/useServices';

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

// Map service names to icon paths
const serviceIconMap: Record<string, string> = {
  'Childcare': '/dashboard/dashboard-mom/service-icons/childcare.svg',
  'Meal Preparation': '/dashboard/dashboard-mom/service-icons/meal-preparation.svg',
  'Light Housekeeping': '/dashboard/dashboard-mom/service-icons/light-housekeeping.svg',
  'Tutoring': '/dashboard/dashboard-mom/service-icons/tutoring.svg',
  'Elderly Check-in': '/dashboard/dashboard-mom/service-icons/elderly-checkin.svg',
  'Daycare Matching': '/dashboard/dashboard-mom/service-icons/daycare-matching.svg',
  'Pet Minding': '/dashboard/dashboard-mom/service-icons/pet-minding.svg',
  'Bringing Amazon packages': '/dashboard/dashboard-mom/service-icons/amazon.svg',
  'Water Plants': '/dashboard/dashboard-mom/service-icons/water-plants.svg',
  'Taking Out Trash': '/dashboard/dashboard-mom/service-icons/takingout-trash.svg',
  'Snow Shoveling': '/dashboard/dashboard-mom/service-icons/snow-shoveling.svg',
  // Default icon for services not in this list
  'default': '/dashboard/dashboard-mom/service-icons/childcare.svg',
};

export default function PopularService() {
  const { services, isLoading } = useServices();

  const getServiceIcon = (serviceName: string) => {
    return serviceIconMap[serviceName] ?? serviceIconMap.default;
  };

  return (
    <>
      <PopHeading>Popular Services</PopHeading>
      <Box sx={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', p: 3 }}>
            <CircularProgress size={40} />
          </Box>
        ) : services.length === 0 ? (
          <Typography sx={{ p: 2 }}>No services available</Typography>
        ) : (
          services.map((service) => (
            <PopService key={service.id}>
              <Image 
                src={getServiceIcon(service.name) as string} 
                alt={service.name} 
                width={64} 
                height={64} 
              />
              <PopTypography>{service.name}</PopTypography>
            </PopService>
          ))
        )}  
      </Box>
    </>
  );
}