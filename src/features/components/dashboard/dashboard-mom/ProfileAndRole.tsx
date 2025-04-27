'use client';
import { styled, Typography, Box } from '@mui/material';

import { DashBoardUserProfile, DashBoardUserImage, DashBoardUserDetails, DashBoardUserName, DashBoardUserRole } from '@/features/dashboard/dashboard-welcome/DashBoardWelcome.style';
interface ProfileAndRoleProps {
imageSrc: string;
userName: string;
userRole: string;

}

const ProfileAndRole: React.FC<ProfileAndRoleProps> = ({
  imageSrc,
  userName,
  userRole
}) => {
  return (
    <DashBoardUserProfile>
      <DashBoardUserImage
        src={imageSrc}
        alt='User Name'
        height={40}
        width={40}
      />
      <DashBoardUserDetails>
        <DashBoardUserName>{userName}</DashBoardUserName>
        <DashBoardUserRole>{userRole}</DashBoardUserRole>
      </DashBoardUserDetails>
    </DashBoardUserProfile>
  );
};

export default ProfileAndRole;
