import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Box, Checkbox, MenuItem } from '@mui/material';
import Link from 'next/link';
import React from 'react';

import { CardCaption, CheckBoxTypography, CheckFlex, InputHolder, OptionalGridBox, StyledInputField, StyledInputFieldCheckBox, StyledInputLabel } from '@/components/form/Froms.style';
import { UserWithAllData } from '@/repository/UserRepository';

const PaymentDetailsForm = ({ formData }: { formData: UserWithAllData }) => {
  return (
    <>
      <InputHolder>
        <StyledInputLabel>Payment Method</StyledInputLabel>
        <StyledInputFieldCheckBox
          disabled
          fullWidth
          disableUnderline
          type="text"
          value={formData.paymentMethod === 'E_TRANSFER' ? 'E-Transfer' : 'Direct Deposit'}
          inputProps={{ min: 0, maxWidth: '280px' }}
        />
      </InputHolder>

      <InputHolder>
        <StyledInputLabel htmlFor='eTransferEmail'>
                    Email for a e-Transfer
        </StyledInputLabel>
        <CardCaption>Payments will be sent to this email address.</CardCaption>
        <StyledInputField
          disabled
          disableUnderline
          type='email'
          id='eTransferEmail'
          name='eTransferEmail'
          value={formData.eTransferEmail}
        />
      </InputHolder>

      <StyledInputLabel>Direct Deposit Information (Optional)</StyledInputLabel>
      <OptionalGridBox>
        <InputHolder>
          <StyledInputLabel htmlFor='bankTransitNumber'>
                        Transit Number
          </StyledInputLabel>
          <StyledInputField
            disabled
            disableUnderline
            type='text'
            id='bankTransitNumber'
            name='bankTransitNumber'
            value={formData.bankTransitNumber}
          />
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor='bankInstitutionNumber'>
                        Institution Number
          </StyledInputLabel>
          <StyledInputField
            disabled
            disableUnderline
            type='text'
            id='bankInstitutionNumber'
            name='bankInstitutionNumber'
            value={formData.bankInstitutionNumber}
          />
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor='bankAccountNumber'>
                        Account Number
          </StyledInputLabel>
          <StyledInputField
            disabled
            disableUnderline
            type='text'
            id='bankAccountNumber'
            name='bankAccountNumber'
            value={formData.bankAccountNumber}
          />
        </InputHolder>
      </OptionalGridBox>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <CheckFlex>
          <Checkbox
            disabled
            icon={<CheckBoxOutlineBlankIcon />}
            checkedIcon={<CheckBoxIcon />}
            checked
          />
          <CheckBoxTypography>
                        I agree to the
            <Link href='/terms-of-service'>&nbsp;Terms of Service</Link>&nbsp; and
            <Link href='/privacy-policy'>&nbsp;Privacy Policy</Link>
          </CheckBoxTypography>
        </CheckFlex>
      </Box>
    </>
  );
};

export default PaymentDetailsForm;