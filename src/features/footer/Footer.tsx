'use client';

import { Link as SocialLink } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';

import { Link } from '@/i18n/routing';

import {FooterMain, FooterContainer, FooterLeft, FooterCopyRight, FooterLinksList ,FooterListItem ,FooterLogoHead, FooterLower, FooterLinksContainer, FooterMediaIcons, FooterMediaItem, FooterTypography, FooterUpper, FooterWrapper,  FooterLinksContainerMobile} from './Footer.style';
import { BoxLink , LinkHeading } from './Footer.style';
import { FooterMobile , FooterUpperMobile} from './Footer.style';

const Footer: FC = () => {
  const pages = [
    {
      heading: 'Services',
      links: [
        { text: 'Child Care', href: '/#services' },
        { text: 'Meal Preparation', href: '/#services' },
        { text: 'Housekeeping', href: '/#services' },
        { text: 'Tutoring', href: '/#services' },
        { text: 'Elderly Check-in', href: '/#services' },
        { text: 'Daycare Matching', href: '/#services' },
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
                  <SocialLink href='https://www.twitter.com'>

                    <Image
                      src={'/footer/x.svg'}
                      width={26}
                      height={26}
                      alt='twitter'
                    />
                  </SocialLink>
                </FooterMediaItem>
                <FooterMediaItem>
                  <SocialLink href='https://www.facebook.com'>
                    <Image
                      src={'/footer/facebook.svg'}
                      width={22}
                      height={22}
                      alt='linked-in'
                    />
                  </SocialLink>
                </FooterMediaItem>
                <FooterMediaItem>
                  <SocialLink href='https://www.instagram.com'>
                    <Image
                      src={'/footer/instagram.svg'}
                      width={22}
                      height={22}
                      alt='linked-in'
                    />
                  </SocialLink>
                </FooterMediaItem>
                <FooterMediaItem>
                  <SocialLink href='https://www.linkedin.com'>
                    <Image
                      src={'/footer/linked-in.svg'}
                      width={22}
                      height={22}
                      alt='linked-in'
                    />
                  </SocialLink>
                </FooterMediaItem>
                
              </FooterMediaIcons>
            </FooterLower>
          </FooterWrapper>

          <FooterMobile>
            <FooterUpperMobile>
              <FooterLeft style={{alignItems: 'center'}}>
                <FooterLogoHead href={'/'}>
                  <Image
                    src={'/footer/white-logo.png'}
                    width={211}
                    height={89}
                    alt='Logo'
                  />
                </FooterLogoHead>

                <FooterTypography style={{textAlign: 'center'}}>
                  Connecting families with certified Mom Helpers for on-demand
                  assistance.
                </FooterTypography>
                
              </FooterLeft>

              <FooterLinksContainerMobile>
                {pages.map((page, pageIndex) => (
                  <BoxLink key={pageIndex} sx={page.heading !== 'Legal' ? {gridColumn: 2} : {gridColumn: 1 , gridRow: 1}}>
                    <LinkHeading>{page.heading}</LinkHeading>
                    <FooterLinksList>
                      {page.links.map((link, index) => (
                        <Link key={index} href={link.href}>
                          <FooterListItem>{link.text}</FooterListItem>
                        </Link>
                      ))}
                      {page.heading === 'Legal' ? <>
                        <FooterTypography>support@fullst3am.com</FooterTypography>
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
                        </FooterMediaIcons></> : '' }
                    </FooterLinksList>
                  </BoxLink>
                ))}
              </FooterLinksContainerMobile>
            </FooterUpperMobile>

            <FooterLower sx={{justifyContent: 'center'}}>
              <FooterCopyRight>
                © 2025 Full St3am Ahead Inc. All rights reserved.
              </FooterCopyRight>
              
            </FooterLower>
          </FooterMobile> 

        </FooterContainer>
      </FooterMain>
    </>
  );
};

export default Footer;
