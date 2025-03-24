'use client';

import Image from 'next/image';

import { Button } from '@/components/buttons/Button.style';

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
  DashBoardUserImage,
} from './DashBoardWelcome.style';
export default function DashBoardWelcome() {
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
            <DashBoardUserImage
              src='/dashboard/welcome-section/user-img.png'
              alt='User Name'
              height={40}
              width={40}
            />
            <DashBoardUserDetails>
              <DashBoardUserName>Sarah Wilson</DashBoardUserName>
              <DashBoardUserRole>Caregiver</DashBoardUserRole>
            </DashBoardUserDetails>
          </DashBoardUserProfile>
        </DashBoardWelcomeControls>
      </DashBoardWelcomeBox>
      <DashBoardWelcomeBack>Welcome back, Sarah!</DashBoardWelcomeBack>
    </>
  );
}
