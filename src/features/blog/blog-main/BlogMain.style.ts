'use client';

import { Box, styled, Typography } from '@mui/material';
import Image from 'next/image';

export const BlogMainContainer = styled(Box)(({theme}) =>({
  display: 'flex',
  gap: '30px',
  justifyContent: 'center',
  position: 'relative',
  marginTop: '95px',
  [theme.breakpoints.down(1200)]:{
    flexDirection: 'column'
  }
}));

export const BlogMainCard = styled(Box)({
  borderRadius: '15px',
  overflow: 'hidden',
  position: 'relative',
  boxShadow: '0px 2px 10.9px 0px #00000075',
  
});

export const BlogSubCard = styled(Box)({
  
  boxShadow: '0px 2px 18.5px 0px #00000047',
  borderRadius: '15px',
  padding: '12px',
  paddingBottom: '23px',
  maxWidth: '386px',
  justifyContent: 'center'

});

export const ImageOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: '#00000033',

  pointerEvents: 'none',
});

export const MainBlogDetailsContainer = styled(Box)<{noBlur?: boolean, pos?: boolean, noPad?: boolean }>(({ noBlur , pos, noPad , theme }) =>({
  backdropFilter: noBlur ? 'none' :'blur(35px)',
  position: pos? 'static' : 'absolute',
  bottom: '0',
  padding: noPad ? 'none': '20px 19px 51px',
  [theme.breakpoints.down(1200)]: {
    padding:  noPad ? 'none' : '15px 12px 30px',
  }
}));

export const CategoryDot = styled(Box)({
  background: '#6C40FF',
  borderRadius: '50%',
  width: '16px',
  height: '16px',
});

export const MainBlogCategoryText = styled(Typography)<{noBack?: boolean}>(({ noBack, theme }) =>({
  color:  '#6C40FF',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '100%',
  letterSpacing: '0px',
  background: noBack ? 'none' : '#F1ECFF',
  width: 'fit-content',
  padding: '5px',
  borderRadius: '20px',
  marginBottom: '10px',
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  [theme.breakpoints.down(1200)]: {
    fontSize: '12px'
  }
}));

export const MainBlogHeading = styled(Typography)<{color?: string , fontSize?: string}>(({ color, fontSize, theme }) =>({
  color: color ? color : 'white',
  fontSize: fontSize ? fontSize : '27px',
  fontWeight: 700,
  lineHeight: '100%',
  letterSpacing: '0px',
  [theme.breakpoints.down(1200)]:{
    fontSize: fontSize ? '14px': '22px'
  }
}));

export const MainTimeDetailsContainer = styled(Box)({
  marginTop: '10px',
  display: 'flex',
  gap: '10px',
});

export const MainBLogTimeDetailsText = styled(Typography)<{color?: string }>(({ color, theme }) =>({
  color: color ? color: 'white',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '100%',
  letterSpacing: '0px',
  [theme.breakpoints.down(1200)]: {
    fontSize: '10px'
  }
}));

export const MainBlogImage = styled(Image)(({theme}) => ({
  maxWidth: '100%',
  maxHeight: '472px',
  objectFit: 'cover',
  [theme.breakpoints.down(1200)]:{
    maxHeight: '380px'
  }
}));

export const BlogSubContainer = styled(Box)(({theme}) =>({
  display: 'flex',
  gap: '19px',
  marginTop: '30px',
  flexWrap: 'wrap',
  justifyContent: 'center'

}));

export const BlogSubImage = styled(Image)({
  maxWidth: '100%',
  objectFit: 'cover',
});

export const BlogImageContainer = styled(Box)({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '8px',
  maxHeight: '160px',
  marginBottom: '10px',
});

export const BlogImageRel = styled(Image)(({theme})=>({
  position: 'absolute',
  top: '-170px',
  right: '-100%',
  opacity: '0.6',
  maxWidth: '600px',
  [theme.breakpoints.down(1200)]:{
    right: '-20%',
    top: '-100px',
    height: '100px',
    width: '100px'
  }

}));