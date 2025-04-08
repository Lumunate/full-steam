'use client';

import { IconButton } from '@mui/material';
import { Box } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';

import { Link } from '@/i18n/routing';

import { SignUpWrapper } from './Navbar.style';
import { SignUpDropDown } from './Navbar.style';
import {
  IconHeadBlack,
  NavbarButtonsContainer,
  NavbarContainer,
  NavbarContentWrapper,
  NavbarLink,
  NavbarLinksContainer,
  NavbarLinkWrapper,
  NavbarLogoHead,
  NavTypography,
  SmallScreenList,
  NavbarDrawer,
} from './Navbar.style';
import { Button } from '../../components/buttons/Button.style';
import { AppContentWrapper } from '../../components/common/Global.style';

const pages = [
  { name: 'Home', link: '/' },
  { name: 'About', link: '/about' },
  { name: 'Contact', link: '/contact' },
];

const Navbar: React.FC = () => {
  const [signUp, setSignUp] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenSignUp = () => {
    setSignUp(!signUp);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  return (
    <NavbarContainer position='fixed'>
      <AppContentWrapper>
        <NavbarContentWrapper>
          <NavbarLogoHead href='/'>
            <Image src={'/logo.svg'} width={160} height={65} alt='Logo' />
          </NavbarLogoHead>

          <NavbarLinksContainer sx={{ display: { xs: 'none', lg: 'flex' } }}>
            {pages.map((page, index) => (
              <NavbarLinkWrapper key={index}>
                <Link href={page.link}>
                  <NavbarLink>{page.name}</NavbarLink>
                </Link>
              </NavbarLinkWrapper>
            ))}
          </NavbarLinksContainer>

          <NavbarButtonsContainer sx={{ display: { xs: 'none', lg: 'flex' } }}>
            <>
              <Link href='/login?role=mom'>
                <Button
                  fontSize='16px'
                  borderRadius='8px'
                  width='115px'
                  height='37px'
                >
                  Login
                </Button>
              </Link>

              <SignUpWrapper>
                <Button
                  special
                  fontSize='16px'
                  borderRadius='8px'
                  width='115px'
                  height='37px'
                  onClick={handleOpenSignUp}
                >
                  Sign Up
                </Button>
                <SignUpDropDown val={signUp}>
                  <Link onClick={handleOpenSignUp} href='/registeration-mom'>
                    Family
                  </Link>
                  <Link
                    onClick={handleOpenSignUp}
                    href='/registeration-mom-helper'
                  >
                    Mom Helper
                  </Link>
                </SignUpDropDown>
              </SignUpWrapper>
            </>
          </NavbarButtonsContainer>

          <IconButton
            edge='start'
            color='inherit'
            aria-label='menu'
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: 'block', lg: 'none' } }}
          >
            <Image
              src='/icons/burger-menu.svg'
              alt='menu icon'
              width={24}
              height={24}
            />
          </IconButton>

          <NavbarDrawer
            anchor='right'
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            sx={{ display: { xs: 'block', lg: 'none' } }}
          >
            <Box
              sx={{ maxWidth: 297, width: '90%', padding: '61px 58px' }}
              role='presentation'
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <SmallScreenList>
                {pages?.map((page, index) => (
                  <NavbarLinkWrapper key={index} smallsr>
                    <Link href={page.link}>
                      <NavbarLink>{page.name}</NavbarLink>
                    </Link>
                  </NavbarLinkWrapper>
                ))}
              </SmallScreenList>
              <Box sx={{ mt: 2 }}>
                <NavTypography>Follow Us</NavTypography>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}
                >
                  <IconHeadBlack
                    src='/footer/twitter.svg'
                    alt='Twitter'
                    width={17}
                    height={12}
                  />
                  <IconHeadBlack
                    src='/footer/linked-in.svg'
                    alt='Linked In'
                    width={14}
                    height={14}
                  />
                  <IconHeadBlack
                    src='/footer/github.svg'
                    alt='Github'
                    width={19}
                    height={12}
                  />
                </Box>
              </Box>
              <NavbarButtonsContainer
                sx={{ display: { xs: 'flex', lg: 'none' }, mt: '20px' }}
              ></NavbarButtonsContainer>
            </Box>
          </NavbarDrawer>
        </NavbarContentWrapper>
      </AppContentWrapper>
    </NavbarContainer>
  );
};

export default Navbar;
