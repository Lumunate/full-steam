import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  Menu,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const CommonNavbarBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

export const CommonMenu = styled(Menu)({
  '& .MuiPaper-root': {
    borderRadius: '0 0 15px 15px',
    boxShadow: '0px 20px 20.5px 0 rgba(0,0,0,0.10)',
    background: '#FCFDFF',
    padding: '10px',
    paddingTop: '20px',
    minWidth: '195px',
  },
  '& .MuiMenuItem-root': {
    color: '#000',
    fontWeight: 400,
    fontSize: '1.6rem',
    textTransform: 'capitalize',
    lineHeight: '27.75px',
    borderRadius: '4px',
    padding: '4px',
    justifyContent: 'center',
    background: 'transparent',
    '&:hover': {
      backgroundColor: '#c0c0c042',
    },
  },
});

export const NavbarContainer = styled(AppBar)({
  width: '100%',
  marginTop: '20px !important',
  backgroundColor: 'transparent',
  boxShadow: 'none',
});

export const NavbarContentWrapper = styled(Toolbar)(({ theme }) => ({
  position: 'relative',
  backgroundColor: '#FCFDFF',
  margin: '0 auto',
  width: '100%',
  borderRadius: '20px',
  boxShadow: '0 4px 37.5px 0 rgba(0,0,0,0.17)',
  height: '69px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 20px',
  [theme.breakpoints.up('md')]: {
    height: '60px',
  },
}));

export const NavbarLinksContainer = styled(CommonNavbarBox)({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
});

export const NavbarButtonsContainer = styled(CommonNavbarBox)({
  justifyContent: 'space-between',
  gap: '11px',
});

export const NavbarLogoHead = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '203px',
  [theme.breakpoints.up('lg')]: {
    width: '203px',
  },
}));

export const NavbarDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    padding: '20px',
    borderRadius: '20px 0 0 20px',
    boxShadow: '0px 4px 39.5px 0px rgba(0, 0, 0, 0.10)',
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    backdropFilter: 'blur(14px)',
  },
});

export const NavbarLinkWrapper = styled(ListItem)<{ smallSR?: boolean }>(
  ({ theme, smallSR }) => ({
    margin: smallSR ? '12px 0' : '0 36px',
    textAlign: smallSR ? 'start' : 'center',
    padding: '0',
    [theme.breakpoints.down(1400)]: {
      margin: smallSR ? '12px 0' : '0 24px',
    },
    [theme.breakpoints.down('xl')]: {
      margin: smallSR ? '12px 0' : '0 18px',
    },
    [theme.breakpoints.down('lg')]: {
      margin: smallSR ? '12px 0' : '0 10px',
    },
  }),
);

export const NavbarLink = styled(Typography)({
  color: '#000',
  fontWeight: 400,
  fontSize: '16px',
  textTransform: 'capitalize',
  '&:hover': {
    color: '#37B5FF',
    transition: 'all 0.3s ease',
  },
});

export const NavTypography = styled(Typography)({
  color: '#000',
  fontWeight: 400,
  fontSize: '15px',
  textTransform: 'capitalize',
  marginBottom: '28px',
});

export const SmallScreenList = styled(List)({
  display: 'flex',
  flexDirection: 'column',
});

export const DropdownMenuWrapper = styled(Box)({});

export const IconHeadBlack = styled(Image)({
  filter:
    'brightness(0) saturate(100%) invert(0%) sepia(5%) saturate(7500%) hue-rotate(228deg) brightness(106%) contrast(106%)',
});

export const DropdownIcon = styled(Image)<{ open?: boolean }>(({ open }) => ({
  marginLeft: '8px',
  transition: 'transform 0.3s ease-in-out',
  transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
}));

export const AvatarDropdownMenuWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
});

export const SignUpDropDown = styled(Box)(({ val }) => ({
  background: '#FCFDFF',
  color: 'black',
  display: val ? 'flex' : 'none',
  flexDirection: 'column',
  gap: '10px',
  borderRadius: '15px',
  alignItems: 'center',
  boxShadow: '0px 4px 37.4px 0px #00000038',
  padding: '18px 12px',
  transition: 'all .3s ease-in',
  position: 'absolute',
  top: '42px',
}));

export const SignUpWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
});
