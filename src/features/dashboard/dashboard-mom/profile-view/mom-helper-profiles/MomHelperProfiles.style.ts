'use client';

import { Box, styled, Typography } from '@mui/material';

export const FilterOptions = styled(Box)(() => ({

  marginTop: '20px',
  marginBottom: '20px',
  display: 'flex',
  gap: '16px',
  justifyContent: 'flex-end',
}));
export const FilterOption = styled(Box)(() => ({
  display: 'flex',
  gap: '2px',
  alignItems: 'center',
  cursor: 'pointer',
  position: 'relative',
}));

export const FilterTypography = styled(Typography)(() => ({
  fontSize: '14px',
  color: '#151515',
}));

export const SortByModal = styled(Box)<{ val: boolean }>(({ val }) =>  ({
  boxShadow: '0px 2px 20.9px 0px #0000002B',
  padding: '16px',
  borderRadius: '12px',
  position: 'absolute',
  top: '30px',
  right: '0',
  zIndex: 20,
  background: '#FFFFFF',
  display: val ? 'block': 'none',
  width: '313px',
}));

export const SortByHeading = styled(Typography)(() => ({
  fontSize: '16px',
  color: '#151515',
  fontWeight: 700
}));

export const CheckbboxContainer = styled(Box)(() => ({
  border: '0.5px solid #8B8B8B59',
  padding: '0 16px ',
  display: 'flex',
  borderRadius: '8px',
  marginTop: '8px',
}));

export const SortSubHeading = styled(Typography)(() => ({
  fontSize: '16px',
  color: '#151515',
  fontWeight: 400

}));

export const FlexColumnBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));