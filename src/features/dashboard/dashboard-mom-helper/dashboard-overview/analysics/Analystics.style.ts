import { Box, styled, Typography } from '@mui/material';

export const AnalysticsHeading = styled(Typography)({
  fontSize: '42px',
  color: '#02405F',
  fontWeight: 400,
  marginBottom: '27px'
});
export const AnalysticsCardBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: '55px'
});
export const AnalysticCard = styled(Box)({
  borderRadius: '28px',
  boxShadow: '0px 16px 24px 0px #0000000F',
  padding: '40px 24px',
  flex: 1,
  maxWidth: '25%'

});

export const AnalysticsStatsHeading = styled(Typography)({
  fontSize: '16px',
  fontWeight: 400,
  color: '#6B7280'
});
export const AnalysticPercentageTypography = styled(Typography)({

  fontSize: '14px',
  fontWeight: 400,
  color: '#10B981'
});

export const AnalysticStatsTypography = styled(Typography)({
  fontSize: '24px',
  fontWeight: 600,
  marginBottom: '10px'
});
export const AnalysticHeadingBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '11px',
});
