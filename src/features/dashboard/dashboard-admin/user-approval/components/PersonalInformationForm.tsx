import React from 'react';

import {
  GridBox,
  InputHolder,
  StyledInputField,
  StyledInputLabel,
} from '@/components/form/Froms.style';
import { UserWithAllData } from '@/repository/UserRepository';

const PersonalInformationForm = ({ formData }: { formData: UserWithAllData }) => {
  return (
    <>
      <GridBox>
        <InputHolder>
          <StyledInputLabel htmlFor='firstName'>First Name</StyledInputLabel>
          <StyledInputField
            disabled
            disableUnderline
            type='text'
            id='firstName'
            name='firstName'
            value={formData.firstName}
          />
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor='lastName'>Last Name</StyledInputLabel>
          <StyledInputField
            disabled
            disableUnderline
            type='text'
            id='lastName'
            name='lastName'
            value={formData.lastName}
          />
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor='username'>Username</StyledInputLabel>
          <StyledInputField
            disabled
            disableUnderline
            type='text'
            id='username'
            name='username'
            value={formData.username}
          />
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor='email'>Email</StyledInputLabel>
          <StyledInputField
            disabled
            disableUnderline
            type='email'
            id='email'
            name='email'
            value={formData.email}

          />
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor='phoneNumber'>
                        Phone Number (10 digits)
          </StyledInputLabel>
          <StyledInputField
            disabled
            disableUnderline
            type='text'
            id='phoneNumber'
            name='phoneNumber'
            value={formData.phoneNumber}
            inputProps={{ maxLength: 10 }}
          />
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor='dateOfBirth'>
                        Date Of Birth
          </StyledInputLabel>
          <StyledInputField
            disabled
            disableUnderline
            type='date'
            id='dateOfBirth'
            name='dateOfBirth'
            value={formData.dateOfBirth}
          />
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor='address'>Address</StyledInputLabel>
          <StyledInputField
            disabled
            disableUnderline
            type='text'
            id='address'
            name='address'
            value={formData.address}
          />
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor='city'>City</StyledInputLabel>
          <StyledInputField
            disabled
            disableUnderline
            type='text'
            id='city'
            name='city'
            value={formData.city}
          />
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor='postalCode'>Postal Code</StyledInputLabel>
          <StyledInputField
            disabled
            disableUnderline
            type='text'
            id='postalCode'
            name='postalCode'
            value={formData.postalCode}
          />
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor='country'>Country</StyledInputLabel>
          <StyledInputField
            disabled
            disableUnderline
            type='text'
            id='country'
            name='country'
            value={formData.country}
          />
        </InputHolder>
      </GridBox>

      <InputHolder>
        <StyledInputLabel htmlFor='state'>State/Province</StyledInputLabel>
        <StyledInputField
          disabled
          disableUnderline
          type='text'
          id='state'
          name='state'
          value={formData.state}
        />
      </InputHolder>

      <InputHolder>
        <StyledInputLabel htmlFor='shortBio'>Short Bio</StyledInputLabel>
        <StyledInputField
          disabled
          disableUnderline
          type='text'
          id='shortBio'
          name='shortBio'
          value={formData.shortBio}
          fullWidth
          multiline
          rows={3}
        />
      </InputHolder>
    </>
  );
};

export default PersonalInformationForm;
