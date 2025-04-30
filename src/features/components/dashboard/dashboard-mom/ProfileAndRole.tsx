'use client';
import { styled, Typography, Box, Avatar } from '@mui/material';
import Image from 'next/image';

import { DashBoardUserProfile, DashBoardUserDetails, DashBoardUserName, DashBoardUserRole } from '@/features/dashboard/dashboard-welcome/DashBoardWelcome.style';
interface ProfileAndRoleProps {
  imageSrc: string;
  userName: string;
  userRole: string;
  serviceType?: string;
}
const DashBoardUserNameBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});
const ServiceTypeBox = styled(Box)({
  background: '#87E5FF4A',
  padding: '0 12px',
  border: '1px solid #10B981',
  borderRadius: '20px',
});
const ServiceTypography = styled(Typography)({
  fontSize: '12px',
  color: '#10B981',
  display: 'flex',
  alignItems: 'center',
  gap: '4px'
});
const DEFAULT_PROFILE_IMAGE = '/dashboard/welcome-section/user-img.png';
const isCloudinaryUrl = (url: string): boolean => {
  return url.includes('res.cloudinary.com');
};
const SafeUserImage = ({ src, alt }: { src: string, alt: string }) => {
  const imageUrl = src && typeof src === 'string' && src.trim() !== '' 
    ? src 
    : DEFAULT_PROFILE_IMAGE;

  if (isCloudinaryUrl(imageUrl)) {
    return (
      <Avatar 
        src={imageUrl} 
        alt={alt} 
        sx={{ 
          width: 40, 
          height: 40, 
          objectFit: 'cover' 
        }} 
      />
      // <img 
      //   src={imageUrl} 
      //   alt={alt} 
      //   width={40} 
      //   height={40} 
      //   style={{ 
      //     objectFit: 'cover',
      //     borderRadius: '50%',
      //     width: 40,
      //     height: 40,
      //   }}
      // />
    );
  }

  return (
    <Image 
      src={imageUrl} 
      alt={alt} 
      width={40} 
      height={40}
      style={{ borderRadius: '50%' }}
    />
  );
};
const ProfileAndRole: React.FC<ProfileAndRoleProps> = ({
  imageSrc,
  userName,
  userRole,
  serviceType = ''
}) => {
  return (
    <DashBoardUserProfile>
      <SafeUserImage src={imageSrc} alt={userName} />
      <DashBoardUserDetails>
        <DashBoardUserNameBox>
          <DashBoardUserName>{userName}</DashBoardUserName>
          {serviceType.toLowerCase() === 'package' ? 
            <ServiceTypeBox>
              <ServiceTypography>
                <Image src='/dashboard/dashboard-mom/service-logs/box.svg' alt='Package' height={12} width={12} />
                Package</ServiceTypography>
            </ServiceTypeBox>: 
            (
              serviceType.toLowerCase() === 'service' ?
                <ServiceTypeBox>
                  <ServiceTypography>
                    <Image src='/dashboard/dashboard-mom/service-logs/shopping-cart.svg' alt='Service' height={12} width={12} />
                Service</ServiceTypography>
                </ServiceTypeBox> : '')
          }
        </DashBoardUserNameBox>
        <DashBoardUserRole>{userRole}</DashBoardUserRole>
      </DashBoardUserDetails>
    </DashBoardUserProfile>
  );
};

export default ProfileAndRole;