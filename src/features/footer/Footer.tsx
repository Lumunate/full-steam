'use client';

import { Box, List, ListItem, styled, Typography } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';

import { Link } from '@/i18n/routing';

const FooterMain = styled(Box)({
  backgroundColor: '#37B5FF',
});

const FooterContainer = styled(Box)({
  maxWidth: '1740px',
  width: '100%',
  margin: '0 auto',
  borderRadius: '20px 20px 0 0',
  padding: '22px 20px',
});
const BoxLink = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '261px',
  justifyContent: 'flex-start',
  padding: '0',
});

const LinkHeading = styled(Typography)({
  color: '#fff',
  fontSize: '16px',
  fontWeight: 700,
  marginBottom: '24px',
  letterSpacing: '1px',
  padding: '0',
});

const FooterLinksList = styled(List)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '0',
  color: '#fff',
});
const FooterListItem = styled(ListItem)({
  padding: '0',
});

const FooterUpper = styled(Box)({
  backgroundColor: '#37B5FF',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  flexDirection: 'row',
  padding: '41px 0 36px',
});

const FooterLower = styled(Box)({
  backgroundColor: '#37B5FF',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderTop: '1px solid #fff',
  width: '100%',
  padding: '35px 0',
});

const FooterLeft = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '19px',
  width: '261px',
});
const FooterWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'space-between',
  [theme.breakpoints.up('sm')]: {
    alignItems: 'center',
  },
  [theme.breakpoints.down('sm')]: {
    alignItems: 'start',
    flexWrap: 'wrap',
  },
}));

const FooterLinksContainer = styled(List)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  [theme.breakpoints.down('sm')]: {
    width: '50%',
    flexDirection: 'column',
    alignItems: 'end',
  },
}));

const FooterLogoHead = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',

  [theme.breakpoints.down('sm')]: {
    width: '50%',
  },
}));

const FooterMediaIcons = styled(List)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    width: '150px',
    justifyContent: 'center',
    transform: 'translateY(-46px)',
  },
}));

const FooterMediaItem = styled(ListItem)(({ theme }) => ({
  padding: '0',
  paddingLeft: '18px',
  cursor: 'pointer',
  transition: 'transform 0.3s ease, filter 0.3s ease',
  [theme.breakpoints.down('md')]: {
    paddingLeft: '10px',
  },
  [theme.breakpoints.down('sm')]: {
    paddingLeft: '6px',
  },
  '& img:hover': {
    filter:
      'brightness(0) saturate(100%) invert(0%) sepia(5%) saturate(7500%) hue-rotate(210deg) brightness(106%) contrast(106%)',
    transform: 'scale(1.2)',
    transition: 'transform 0.3s ease',
  },
}));

const FooterTypography = styled(Typography)(() => ({
  color: '#fff',
  fontSize: '16px',
  fontWeight: 400,
  letterSpacing: '1px',
}));

const FooterCopyRight = styled(Typography)(() => ({
  fontSize: '16px',
  fontFamily: 'Urbanist',
  fontWeight: 400,
  color: '#fff',
  letterSpacing: '1px',
}));

const Footer: FC = () => {
  const pages = [
    {
      heading: 'Services',
      links: [
        { text: 'Child Care', href: '/child-care' },
        { text: 'Meal Preparation', href: '/meal-preparation' },
        { text: 'Housekeeping', href: '/housekeeping' },
        { text: 'Tutoring', href: '/tutoring' },
        { text: 'Elderly Check-in', href: '/elderly-check-in' },
        { text: 'Daycare Matching', href: '/daycare-matching' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { text: 'About', href: '/about' },
        { text: 'Become a Mom Helper', href: '/registeration-mom-helper' },
        { text: 'Join as a family', href: '/registeration-mom' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { text: 'Privacy Policy', href: '/privacy-policy' },
        { text: 'Terms of Service', href: '/terms-service' },
        { text: 'Service Agreement', href: '/service-agreement' },
      ],
    },
  ];

  return (
    <>
      <FooterMain>
        <FooterContainer>
          <FooterWrapper>
            <FooterUpper>
              <FooterLeft>
                <FooterLogoHead href={'/'}>
                  <Image
                    src={'/footer/white-logo.png'}
                    width={211}
                    height={89}
                    alt='Logo'
                  />
                </FooterLogoHead>

                <FooterTypography>
                  Connecting families with certified Mom Helpers for on-demand
                  assistance.
                </FooterTypography>
                <FooterTypography>support@fullst3am.com</FooterTypography>
              </FooterLeft>

              <FooterLinksContainer>
                {pages.map((page, pageIndex) => (
                  <BoxLink key={pageIndex}>
                    <LinkHeading>{page.heading}</LinkHeading>
                    <FooterLinksList>
                      {page.links.map((link, index) => (
                        <Link key={index} href={link.href}>
                          <FooterListItem>{link.text}</FooterListItem>
                        </Link>
                      ))}
                    </FooterLinksList>
                  </BoxLink>
                ))}
              </FooterLinksContainer>
            </FooterUpper>

            <FooterLower>
              <FooterCopyRight>
                © 2025 Full St3am Ahead Inc. All rights reserved.
              </FooterCopyRight>
              <FooterMediaIcons>
                <FooterMediaItem>
                  <Image
                    src={'/footer/twitter.svg'}
                    width={26}
                    height={26}
                    alt='twitter'
                  />
                </FooterMediaItem>
                <FooterMediaItem>
                  <Image
                    src={'/footer/linked-in.svg'}
                    width={22}
                    height={22}
                    alt='linked-in'
                  />
                </FooterMediaItem>
                <FooterMediaItem>
                  <Image
                    src={'/footer/github.svg'}
                    width={22}
                    height={22}
                    alt='github'
                  />
                </FooterMediaItem>
              </FooterMediaIcons>
            </FooterLower>
          </FooterWrapper>
        </FooterContainer>
      </FooterMain>
    </>
  );
};

export default Footer;
