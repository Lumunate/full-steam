'use client';

import {
  FormControl,
  MenuItem,
  Select,
  styled,
  TextField,
} from '@mui/material';

export const StyledTextField = styled(TextField)<{
  inputfontsize?: string;
  labelfontsize?: string;
}>(({ theme, inputfontsize = '14px', labelfontsize = '12px' }) => ({
  [theme.breakpoints.down('sm')]: {
    marginTop: '6px',
  },
  input: {
    fontWeight: 600,
    fontSize: inputfontsize,
    height: '36px',
    minHeight: '36px',
    padding: '0',
  },
  '& .MuiInputLabel-root': {
    color: '#818181',
    fontWeight: 600,
    fontSize: labelfontsize,
    textTransform: 'capitalize',
  },
  '& .MuiInputBase-input.MuiInput-input': {
    fontWeight: 600,
    fontSize: inputfontsize,
  },
  '& .MuiFormHelperText-root.Mui-error ': {
    fontSize: '10px',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#818181',
  },
  '& .MuiInput-underline:before': {
    borderBottom: '1px solid #818181',
  },
  '& .MuiInput-underline:after': {
    borderBottom: '1px solid black',
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottom: '1px solid black',
  },
}));

export const CustomFormControl = styled(FormControl)<{
  labelfontsize?: string;
}>(({ labelfontsize = '10px' }) => ({
  '& .MuiInputLabel-root': {
    color: '#818181',
    fontWeight: 600,
    fontSize: labelfontsize,
    textTransform: 'capitalize',
  },

  '& .MuiFormHelperText-root.Mui-error ': {
    fontSize: '10px',
  },

  '& .MuiInputLabel-root.Mui-focused': {
    color: '#818181',
    fontSize: labelfontsize,
  },
}));

export const StyledSelectField = styled(Select)<{
  inputfontsize?: string;
  labelfontsize?: string;
}>(({ inputfontsize = '14px' }) => ({
  textAlign: 'start',
  fontWeight: 600,
  fontSize: inputfontsize,
  overflow: 'hidden',
  height: '36px',
  minHeight: '36px',
  lineHeight: '34px',

  '& .MuiSelect-select': {
    height: '36px',
    minHeight: '36px',
  },
  '& .MuiFormHelperText-root.Mui-error ': {
    fontSize: '10px',
  },

  '&.MuiInput-underline:before': {
    borderBottom: '1px solid black',
  },
  '&.MuiInput-underline:after': {
    borderBottom: '1px solid black',
  },
  '&:hover .MuiInput-underline:before': {
    borderBottom: '1px solid black !important',
  },
}));

export const CustomInputLabel = styled(MenuItem)({
  color: '#818181',
  fontWeight: 600,
  fontSize: '16px',
  textTransform: 'capitalize',
  padding: '0',
  background: 'none',
  '&:hover ': {
    background: 'none',
  },
});

export const StyledFormControl = styled(FormControl)({
  margin: '16px 0',
  minWidth: 120,
  width: '100%',
});

export const StyledMenuItem = styled(MenuItem)({
  fontSize: '14px',
});
