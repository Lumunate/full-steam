import { Box, FormLabel, styled } from '@mui/material';

export const UploadContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const DropZone = styled(Box)(({ theme }) => ({
  margin: 'auto 0',
  width: '120px',
  height: '120px',
  border: `2px dashed #ccc`,
  borderRadius: '50%',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all .24s ease-in-out',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:hover': {
    border: `2px dashed ${theme.palette.primary.main}`,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

export const Input = styled('input')({
  display: 'none',
});

export const DropZoneLabel = styled(FormLabel)({
  fontSize: '1rem',
  color: '#666',
  fontWeight: 600,
  marginBottom: '0.5rem',
  textAlign: 'center',
});