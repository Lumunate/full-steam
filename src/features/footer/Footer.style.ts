'use client';

import { Box, List, ListItem, styled, Typography } from '@mui/material';

import { Link } from '@/i18n/routing';

export const FeedbackFormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#FCFDFF',
  padding: '70px 58px 36px',
  borderRadius: '20px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  zIndex: 1,
  [theme.breakpoints.down('xl')]: {
    padding: '50px 40px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '40px 30px',
  },

  '& .react-datepicker-wrapper': {
    width: '100% !important',
    background: '#ffffff !important',
    color: 'black !important',
    border: 'none !important',
    outline: 'none !important',
  },

  '& .feedback-datepicker': {
    width: '100% !important',
    background: '#ffffff !important',
    border: 'none !important',
    outline: 'none !important',
    borderBottom: '1px solid #818181 !important',
    fontSize: '18px !important',
    color: '#000 !important',
    fontWeight: 600,
    height: '36px !important',
    fontFamily: 'Jost, sans-serif !important',
    marginTop: '15px',
  },

  '& .feedback-datepicker::placeholder': {
    color: '#818181 !important',
    fontFamily: 'Jost, sans-serif !important',
    fontSize: '16px !important',
    textTransform: 'capitalize !important',
    fontWeight: 500,
  },

  '& .feedback-datepicker:focus': {
    borderBottom: '1px solid #000 !important',
  },
  '& .react-datepicker': {
    fontFamily: 'Lato, sans-serif',
    borderRadius: '12px',
    overflow: 'hidden',
    border: 'none',
    boxShadow: '0px 4px 39.5px 0px rgba(0, 0, 0, 0.10)',
    width: '220px',
  },
  '& .react-datepicker__month-container': {
    width: '100%',
  },
  '& .react-datepicker__header': {
    background: '#fff',
    borderBottom: '1px solid #e5e5e5',
    padding: '10px 15px',
  },
  '& .react-datepicker__day': {
    fontSize: '10px',
  },
  '& .react-datepicker__day-names': {
    marginTop: '6px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  '& .react-datepicker__day-name': {
    fontWeight: 600,
    fontSize: '10px',
  },
  '& .react-datepicker__day--selected': {
    borderRadius: '50%',
    background: '#da9694',
  },
  '& .react-datepicker__current-month': {
    fontSize: '14px',
    fontWeight: 500,
  },
  '& .react-datepicker__month': {
    margin: '10px 15px 20px',
  },
  '& .react-datepicker__week': {
    padding: '3px 0',
    display: 'flex',
    justifyContent: 'space-between',
  },
  '& .react-datepicker-popper .react-datepicker__triangle': {
    stroke: 'none',
    display: 'none',
  },
  '& .react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle':
    {
      fill: 'none',
      color: 'none',
    },
  '& .react-datepicker__navigation': {
    top: '5px',
  },
  '& .react-datepicker__navigation-icon::before': {
    borderColor: '#000',
    borderWidth: '1px 1px 0 0',
  },
}));
export const FooterMain = styled(Box)({
  backgroundColor: '#37B5FF',
});

export const FooterContainer = styled(Box)({
  maxWidth: '1740px',
  width: '100%',
  margin: '0 auto',
  borderRadius: '20px 20px 0 0',
  padding: '22px 20px',
});
export const BoxLink = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: '0',
});

export const LinkHeading = styled(Typography)({
  color: '#fff',
  fontSize: '16px',
  fontWeight: 700,
  marginBottom: '24px',
  letterSpacing: '1px',
  padding: '0',
});

export const FooterLinksList = styled(List)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '0',
  color: '#fff',
});
export const FooterListItem = styled(ListItem)({
  padding: '0',

});

export const FooterUpper = styled(Box)({
  backgroundColor: '#37B5FF',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  flexDirection: 'row',
  padding: '41px 0 36px',
});

export const FooterLower = styled(Box)({
  backgroundColor: '#37B5FF',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderTop: '1px solid #fff',
  width: '100%',
  padding: '35px 0',
});

export const FooterLeft = styled(Box)(({theme}) =>({
  display: 'flex',
  flexDirection: 'column',
  gap: '19px',
  [theme.breakpoints.down(1200)]:{
    width: '100%'
  }
}));
export const FooterWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'space-between',
  [theme.breakpoints.down(1200)]: {
    display: 'none !important'
  }
}));

export const FooterLinksContainer = styled(List)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  [theme.breakpoints.down('sm')]: {
    width: '50%',
    flexDirection: 'column',
    alignItems: 'end',
  },
}));

export const FooterLogoHead = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',

  [theme.breakpoints.down('sm')]: {
    width: '50%',
  },
}));

export const FooterMediaIcons = styled(List)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

export const FooterMediaItem = styled(ListItem)(({ theme }) => ({
  padding: '0',
  paddingLeft: '18px',
  cursor: 'pointer',
  transition: 'transform 0.3s ease, filter 0.3s ease',
  [theme.breakpoints.down(1200)]: {
    paddingLeft: '0 !important',

  },
  
}));

export const FooterTypography = styled(Typography)(() => ({
  color: '#fff',
  fontSize: '16px',
  fontWeight: 400,
  letterSpacing: '1px',
}));

export const FooterCopyRight = styled(Typography)(() => ({
  fontSize: '16px',
  fontFamily: 'Urbanist',
  fontWeight: 400,
  color: '#fff',
  letterSpacing: '1px',
}));

export const FooterMobile  = styled(Box)(({theme}) => ({

  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  [theme.breakpoints.up(1200)]:{
    display: 'none'
  }

}));

export const FooterUpperMobile = styled(Box)(()=> ({

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%'
  
}));

export const FooterLinksContainerMobile = styled(Box)(({theme}) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2,1fr)',
  marginTop: '24px',
  marginBottom: '26px',
  gap: '8px',
  [theme.breakpoints.down(1200)]: {
    width: '100%'
  }
}));