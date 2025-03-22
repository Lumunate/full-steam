'use client';

import {FormControlLabel,  Box,  Radio, styled, RadioGroup, Typography, Input, InputLabel } from '@mui/material';
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
  display: 'none'
});

export const StyledLabel = styled(FormControlLabel)(({ theme , isselected }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0',
  cursor: 'pointer',
  padding: '9px 0',
  borderRadius: '8px',
  width: ' 105px',
  background: isselected ? 'white': '',
  boxShadow: isselected ? '0px 4px 14px 0px #0000002B' : '',
}));

export const FormContainer = styled(Box)(({ customwidth, paddingBottom }) => ({
  padding: '32px',
  borderRadius: '25px',
  boxShadow: '0px 3px 22.9px 0px #0000001A',
  marginTop: '32px',
  width : customwidth ? customwidth : '1200px',
  maxWidth : customwidth ? customwidth : '1200px',
  paddingBottom: paddingBottom ? paddingBottom : '50px'
}));


export const StyledInputField = styled(Input)({

  border: '1px solid #DFEAF2' ,
  borderRadius: '15px',
  padding: '22px',
  fontSize: '15px',
  fontWeight: 400,
  color: '#005782',
width: '100%'


});
export const StyledInputLabel = styled(InputLabel)({

 marginBottom: '14px',
 fontSize: '16px',
 marginTop: '37px',
 color: '#232323'

});

export const RegisterTypography =styled(Typography)({

fontSize: '16px',
fontWeight: '400',
marginTop: '10px',
textAlign: 'center' 
})