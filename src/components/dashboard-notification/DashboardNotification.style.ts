import { Box, styled, Typography } from '@mui/material';
import Image from 'next/image';

import { Button } from '../buttons/Button.style';

export const DashBoardNotifcationBox = styled(Box)({
  borderRadius: '8px',
  border: '1px solid #F3F4F6',
  padding: '17px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

export const ClientNameBox = styled(Box)({
  display: 'flex',
  gap: '8px'
});

export const ClientInfoBox = styled(Box)({
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
});

export const ClientProfilePic = styled(Image)({
  borderRadius: '50%',
  objectFit: 'cover',
});

export const ClientDetailsBox = styled(Box)({});

export const ClientName = styled(Typography)({
  fontSize: '16px',
  fontWeight: 500,
  color: '#000000',
});

export const ClientRole = styled(Typography)({});

export const ClientRelatedTypography = styled(Typography)({
  fontSize: '14px',
  fontWeight: 400,
  color: '#6B7280',
});

export const ClientRelatedActionButton = styled(
  Button,
)<{buttonAction: string;}>(({ buttonAction }) => ({
  background:
    buttonAction === 'view-details'
      ? '#E5E7EB'
      : buttonAction === 'start-session' || buttonAction === 'approved'
        ? '#10B981'
        : buttonAction === 'pending'
          ? '#FEA539'
          : buttonAction === 'rejected'
            ? '#B94310'
            : '',
  color: buttonAction !== 'view-details' ? '#FFFFFF' : '#374151',
  border: 'none',
  fontWeight: 400,
}));

export const DashBoardSectionHeading = styled(Typography)({
  color: '#02405F',
  fontSize: '28px',
  fontWeight: 400,
  marginTop: '65px'
});
