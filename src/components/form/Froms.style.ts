'use client';

import {
  FormControlLabel,
  Box,
  Radio,
  RadioGroup,
  Typography,
  Input,
  InputLabel,
  Select,
  TableCell
} from '@mui/material';
import { fontSize, styled } from '@mui/system';
import Image from 'next/image';
export const RadioContainer = styled(RadioGroup)({
  background: '#E7F7FF',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
  padding: '8px',
  marginTop: '32px',
  borderRadius: '12px',
});
export const StyledRadio = styled(Radio)({
  display: 'none',
});

export const StyledLabel = styled(FormControlLabel)<{ isselected?: boolean }>(
  ({ isselected }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0',
    cursor: 'pointer',
    padding: '9px 0',
    borderRadius: '8px',
    width: '105px',
    background: isselected ? 'white' : '',
    boxShadow: isselected ? '0px 4px 14px 0px #0000002B' : '',
  }),
);

export const CertificateUploadBox = styled(Box)({
  background: '#EAF9FF',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  padding: '10px 20px',
  borderRadius: '15px',
  border: '1px solid #DFEAF2',
  height: '62px',
});

export const FormContainer = styled(Box)<{
  customwidth?: string;
  paddingBottom?: string;
}>(({ customwidth = '1200px', paddingBottom = '50px' }) => ({
  padding: '32px',
  borderRadius: '25px',
  boxShadow: '0px 3px 22.9px 0px #0000001A',
  marginTop: '32px',
  width: '100%',
  maxWidth: customwidth,
  paddingBottom: paddingBottom,
}));

export const StyledInputField = styled(Input)({
  border: '1px solid #DFEAF2',
  borderRadius: '15px',
  padding: '22px',
  fontSize: '15px',
  fontWeight: 400,
  color: '#005782',
  width: '100%',
});

export const StyledSelect = styled(Select)({
  border: '1px solid #DFEAF2',
  borderRadius: '15px',
  padding: '22px',
  fontSize: '15px',
  fontWeight: 400,
  color: '#005782',
  width: '100%',
});

export const StyledInputLabel = styled(InputLabel)(({theme}) => ({
  marginBottom: '14px',
  fontSize: '16px',
  marginTop: '37px',
  color: '#232323',
  [theme.breakpoints.down(1200)]: {
    fontSize :'13px',
  }
}));

export const RegisterTypography = styled(Typography)({
  fontSize: '16px',
  fontWeight: '400',
  marginTop: '10px',
  textAlign: 'center',
});

export const CheckFlex = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  marginTop: '32px',
});

export const FormHeading = styled(Typography)(({theme}) =>({
  fontSize: '28px',
  fontWeight: 400,
  color: '#02405F',
  [theme.breakpoints.down(1200)]:{
    fontSize: '22px'
  }
}));

export const StyledCheckBoxLabel = styled(StyledInputLabel)({
  fontSize: '15px',
  color: '#005782',
  margin: 0,
});
export const FormDescription = styled(Typography)(({theme}) =>({
  fontSize: '16px',
  fontWeight: 400,
  color: '#02405F',
  [theme.breakpoints.down(1200)]:{
    fontSize: '14px'
  }
}));

export const GridBox = styled(Box)(({theme}) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '0 37px',
  [theme.breakpoints.down(1200)]:{
    gridTemplateColumns : 'repeat(1, 1fr)'
  }
}));

export const OptionalGridBox = styled(GridBox)({
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '0 20px',
});

export const BorderBox = styled(Box)({
  padding: '15px 25px',
  border: '1px solid #DFEAF2',
  borderRadius: '15px',
});

export const CertificateBoxWrapper = styled(BorderBox)({
  padding: '15px',
  marginTop: '16px',
});

export const CertificateStyledInputLabel = styled(StyledInputLabel)({
  marginTop: '0px',
});

export const GridBoxBordered = styled(BorderBox)(({theme}) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '10px',
  
}));

export const ProfileBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  margin: '32px 0',
});

export const ProfileWrapper = styled(Box)({
  borderRadius: '50%',
  position: 'relative',
});

export const InputHolder = styled(Box)({
//  height: '32px'
});

export const ButtonContainer = styled(Box)(({theme}) =>({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: '32px',
  [theme.breakpoints.down(1200)]: {flexDirection : 'column' , gap: '5px'}
}));

export const ProfileImage = styled(Image)({
  borderRadius: '50%',
  overflow: 'hidden',
  objectFit: 'cover',
});
export const ControlBox = styled(Box)<{ checked: boolean }>(({ checked }) => ({
  display: 'flex',
  borderRadius: '15px',
  border: checked ? '1px solid #005782' : '1px solid #DFEAF2',
  alignItems: 'center',
  padding: '20px 15px',
  cursor: 'pointer',
  background: checked ? '#34BCFF33' : 'transparent',
}));

export const CardCaption = styled(Typography)({
  color: '#827A7A',
  fontSize: '13px',
  fontStyle: 'italic',
  fontWeight: '400',
  marginTop: '10px',
});

export const CheckBoxTypography = styled(Typography)({
  fontSize: '16px',
  fontWeight: 400,
  color: '#232323',
});

export const CheckBorderBox = styled(BorderBox)<{ index: number }>(
  ({ index }) => ({
    marginTop: index === 0 ? 0 : '12px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'
  })
);

export const CheckBoxContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
  alignItems: 'center'
});

export const StyledInputFieldCheckBox = styled(StyledInputField)({
  maxWidth: '120px',
  height: '45px'
});

export const BorderBoxInternal = styled(BorderBox)({
  padding: '0'
});

export const CustomSelect = styled(Select)({
  borderRadius: '15px',
  height: '45px',
  width: '120px'
});

export const CustomTableCell = styled(TableCell)({

  color: '#005782',
  fontSize: '14px'
});


export const PopupOverlay = styled(Box)({
  width: 'calc(100vw + 40px)',
  height: '100vh',
  background: '#444343f2',
  position: 'fixed',
  top: 0,
  zIndex: 9999,
  left: '-20px',
  
  
});

export const PopUpModal = styled(Box)({

  borderRadius: '24px',
  maxWidth: '700px',
  width: '100%',
  background: '#FFFFFF',
  zIndex: 20,
  padding: '49px 32px',
  maxHeight: '70vh',
  overflow: 'scroll',
  margin:'auto' ,  marginTop: '150px',
  boxShadow: '0px 3px 22.9px 0px #0000001A',


});