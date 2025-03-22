import { styled, Typography } from '@mui/material';
import { Box } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

import ApplicationSatus from '@/components/application-status/ApplicationStatus';
import { Button } from '@/components/buttons/Button.style';

import {
  FormContainer,
  StyledInputField,
  StyledLabel,
  StyledInputLabel
} from '../form-styles/Froms.style';

const FormHeading = styled(Typography)( {
  fontSize: '28px',
  fontWeight: 400,
  color: '#02405F',
});

const FormDescription = styled(Typography)( {
  fontSize: '16px',
  fontWeight: 400,
  color: '#02405F',
});

const GridBox = styled(Box)( {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '0 37px',
});

const ProfileBox = styled(Box)( {
  display: 'flex',
  justifyContent: 'center',
  margin: '32px 0',
});

const ProfileWrapper = styled(Box)( {
  borderRadius: '50%',
  position: 'relative',
});

const InputHolder = styled(Box)( {});

const ButtonContainer = styled(Box)( {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: '32px',
});

const ProfileImage = styled(Image)({
  borderRadius: '50%',
  overflow: 'hidden'
});

export default function RegsiterationFormMom() {
  const [filePath, setFilePath] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    user: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    birthday: '',
    city: '',
    postcode: '',
    country: '',
    bio: ''
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileUrl = URL.createObjectURL(file);

      setFilePath(fileUrl); 
    }
  };

  const handleFileExplorerClick = () => {
    document.getElementById('fileInput').click(); 
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, 
    });
  };

  const isFormValid = () => {
    if (currentStep === 1) {
      return formData.name && formData.user && formData.email && formData.phone && formData.birthday && formData.address && formData.city && formData.postcode && formData.country && formData.bio && formData.password;
    }
    if (currentStep === 2) {
      return formData.password;
    }
    if (currentStep === 3) {
      return formData.address && formData.phone; 
    }

    return false;
  };

  const nextStep = () => {
    if (isFormValid()) {
      setCurrentStep(currentStep + 1); 
    } else {
      alert('Please fill out all fields!');
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1); 
  };

  const step1 = (
    <>
      <FormHeading>Personal Information</FormHeading>
      <FormDescription>
        Tell us about your family so we can match you with the right Mom
        Helper.
      </FormDescription>
      <ProfileBox>
        <ProfileWrapper>
          <ProfileImage
            src={filePath || '/registeration-mom/profile.svg'}
            alt="Profile Pic"
            height={140}
            width={140}
          />
          <Image
            src="/registeration-mom/upload.svg"
            alt="Upload"
            height={40}
            width={40}
            style={{
              cursor: 'pointer',
              position: 'absolute',
              bottom: 0,
              right: 0,
            }}
            onClick={handleFileExplorerClick}
          />
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </ProfileWrapper>
      </ProfileBox>

      <GridBox>
        <InputHolder>
          <StyledInputLabel htmlFor="name">Your Name</StyledInputLabel>
          <StyledInputField
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor="user">User Name</StyledInputLabel>
          <StyledInputField
            type="text"
            id="user"
            name="user"
            value={formData.user}
            onChange={handleChange}
          />
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor="email">Password</StyledInputLabel>
          <StyledInputField
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </InputHolder>
        <InputHolder>
          <StyledInputLabel htmlFor="email">Email</StyledInputLabel>
          <StyledInputField
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor="phone">Phone Number</StyledInputLabel>
          <StyledInputField
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor="birthday">Date Of Birth</StyledInputLabel>
          <StyledInputField
            type="date"
            id="birthday"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
          />
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor="address">Address</StyledInputLabel>
          <StyledInputField
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor="city">City</StyledInputLabel>
          <StyledInputField
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor="postcode">Postal Code</StyledInputLabel>
          <StyledInputField
            type="text"
            id="postcode"
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
          />
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor="country">Country</StyledInputLabel>
          <StyledInputField
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </InputHolder>

      </GridBox>
      <InputHolder>
        <StyledInputLabel htmlFor="bio">Short Bio</StyledInputLabel>
        <StyledInputField
          type="text"
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          fullWidth
          multiline
        />
      </InputHolder>
    </>
  );

  const step2 = (
    <>
      <FormHeading>Children & Service Needs</FormHeading>
      <FormDescription>
        Share information about your children and the services you need.
      </FormDescription>
      <GridBox>
        <InputHolder>
          <StyledInputLabel htmlFor="password">Password</StyledInputLabel>
          <StyledInputField
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </InputHolder>
      </GridBox>
    </>
  );

  const step3 = (
    <>
      <FormHeading>Payment Details</FormHeading>
      <FormDescription>
        Add your payment method to easily book Mom Helpers.
      </FormDescription>
      <GridBox>
        <InputHolder>
          <StyledInputLabel htmlFor="address">Address</StyledInputLabel>
          <StyledInputField
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </InputHolder>
        <InputHolder>
          <StyledInputLabel htmlFor="phone">Phone</StyledInputLabel>
          <StyledInputField
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </InputHolder>
      </GridBox>
    </>
  );

  return (
    <>
    
      <FormContainer paddingBottom="200px">
        {currentStep === 1 && step1}
        {currentStep === 2 && step2}
        {currentStep === 3 && step3}

        <ButtonContainer>
          {currentStep > 1 && (
            <Button onClick={prevStep} padding="18px 90px" fontSize="18px">
              Back
            </Button>
          )}
          {currentStep < 3 && (
            <Button
              special
              onClick={nextStep}
              padding="18px 90px"
              fontSize="18px"
            >
              Next
            </Button>
          )}
          {currentStep === 3 && (
            <Button
              onClick={() => alert('Form Submitted!')}
              disabled={!isFormValid()}
              padding="18px 90px"
              fontSize="18px"
              special
            >
              Submit
            </Button>
          )}
        </ButtonContainer>
        <ApplicationSatus isMom />
      </FormContainer>
    </>
  );
}
