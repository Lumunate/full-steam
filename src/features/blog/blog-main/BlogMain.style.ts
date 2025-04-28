'use client';

import { Box, styled, Typography } from '@mui/material';
import Image from 'next/image';

export const BlogMainContainer = styled(Box)({
  display: 'flex',
  gap: '30px',
  justifyContent: 'center',
  position: 'relative',
  marginTop: '95px',
});

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

export const MainBlogDetailsContainer = styled(Box)<{noBlur?: boolean, pos?: boolean, noPad?: boolean }>(({ noBlur , pos, noPad  }) =>({
  backdropFilter: noBlur ? 'none' :'blur(35px)',
  position: pos? 'static' : 'absolute',
  bottom: '0',
  padding: noPad ? 'none': '20px 19px 51px',
}));

export const CategoryDot = styled(Box)({
  background: '#6C40FF',
  borderRadius: '50%',
  width: '16px',
  height: '16px',
});

export const MainBlogCategoryText = styled(Typography)<{noBack?: boolean}>(({ noBack }) =>({
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
}));

export const MainBlogHeading = styled(Typography)<{color?: string , fontSize?: string}>(({ color, fontSize }) =>({
  color: color ? color : 'white',
  fontSize: fontSize ? fontSize : '27px',
  fontWeight: 700,
  lineHeight: '100%',
  letterSpacing: '0px',
}));

export const MainTimeDetailsContainer = styled(Box)({
  marginTop: '10px',
  display: 'flex',
  gap: '10px',
});

export const MainBLogTimeDetailsText = styled(Typography)<{color?: string }>(({ color }) =>({
  color: color ? color: 'white',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '100%',
  letterSpacing: '0px',
}));

export const MainBlogImage = styled(Image)({
  maxWidth: '788px',
  objectFit: 'cover',
});

export const BlogSubContainer = styled(Box)({
  display: 'flex',
  gap: '19px',
  marginTop: '30px',

});

export const BlogSubImage = styled(Image)({
  objectFit: 'cover',
});

export const BlogImageContainer = styled(Box)({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '8px',
  maxHeight: '160px',
  marginBottom: '10px',
});

export const BlogImageRel = styled(Image)({
  position: 'absolute',
  top: '-170px',
  right: '-100%',
  opacity: '0.6',

});