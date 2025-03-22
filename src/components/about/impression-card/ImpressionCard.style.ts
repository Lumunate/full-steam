import { Box , styled , Typography} from '@mui/material';

export const ImpressionCardContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '12px',
  borderRadius: '32px',
  boxShadow: '0px 4px 10.6px 0px #0000001F',
  padding: '32px',
  maxWidth: '900px',
  zIndex: 10

}));

export const ImpressionCardText = styled(Typography)(()=>({
  fontSize: '22px',
  letterSpacing: '-1px',
  fontWeight: 400
}));