'use client';

import Avatar from '@mui/material/Avatar';
import Image from 'next/image';

import { Button } from '@/components/buttons/Button.style';
import { useCurrentUser } from '@/hooks/useCurrentUser';

import {
  DashBoardWelcomeBack,
  DashBoardWelcomeBox,
  DashBoardHeading,
  DashBoardWelcomeControls,
  DashBoardSearchInput,
  DashBoardSearchInputBox,
  DashBoardNotifications,
  DashBoardSettings,
  DashBoardUserProfile,
  DashBoardUserName,
  DashBoardUserRole,
  DashBoardUserDetails,
} from './DashBoardWelcome.style';

// Map user roles to more user-friendly display names
const roleDisplayMapping: Record<string, string> = {
  'HELPER': 'Caregiver',
  'USER': 'Parent',
  'ADMIN': 'Administrator',
  'SERVICE_MASTER': 'Service Manager'
};

export default function DashBoardWelcome() {
  // Get current user data
  const { user, isLoading } = useCurrentUser();

  // Get user display name - use first and last name if available, otherwise username
  const userName = user
    ? `${user.firstName} ${user.lastName || ''}`
    : 'User';
    
  // Get user role display name
  const userRoleDisplay = user && user.role 
    ? (roleDisplayMapping[user.role] || user.role)
    : 'Guest';

  // Get user profile image with fallback
  const userImageSrc = user && user.image && user.image.trim() !== ''
    ? user.image
    : '/dashboard/welcome-section/user-img.png';

  return (
    <>
      <DashBoardWelcomeBox>
        <DashBoardHeading>Dashboard</DashBoardHeading>
        <DashBoardWelcomeControls>
          <DashBoardSearchInputBox>
            <Image
              src='/dashboard/magnifying-glass.svg'
              alt='search-icon'
              height={20}
              width={20}
            />
            <DashBoardSearchInput
              disableUnderline
              placeholder='Search for something'
            />
          </DashBoardSearchInputBox>
          <Button special width='200px'>
            Upgrade to Majordomo
          </Button>
          <DashBoardSettings
            src='/dashboard/welcome-section/settings.svg'
            alt='Notification Icon'
            height={50}
            width={50}
          />
          <DashBoardNotifications
            src='/dashboard/welcome-section/notification.svg'
            alt='Settings Icon'
            height={50}
            width={50}
          />
          <DashBoardUserProfile>
            {/* Use MUI Avatar component for all user images */}
            <Avatar
              alt={userName}
              src={userImageSrc}
              sx={{ 
                width: 40, 
                height: 40,
                border: '1px solid #f0f0f0'
              }}
            />
            <DashBoardUserDetails>
              <DashBoardUserName>{userName}</DashBoardUserName>
              <DashBoardUserRole>{userRoleDisplay}</DashBoardUserRole>
            </DashBoardUserDetails>
          </DashBoardUserProfile>
        </DashBoardWelcomeControls>
      </DashBoardWelcomeBox>
      <DashBoardWelcomeBack>Welcome back, {user ? user.firstName : 'User'}!</DashBoardWelcomeBack>
    </>
  );
}