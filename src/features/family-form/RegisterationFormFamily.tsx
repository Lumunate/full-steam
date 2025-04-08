'use client';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Snackbar, Input, Alert, Checkbox } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { ChangeEvent } from 'react';

import ApplicationSatus from '@/components/application-status/ApplicationStatus';
import { Button } from '@/components/buttons/Button.style';
import RegisterationSlider from '@/components/registeration-slider/RegisterationSlider';
import { Link } from '@/i18n/routing';

import {
  FormHeading,
  FormDescription,
  FormContainer,
  ProfileBox,
  ProfileImage,
  ProfileWrapper,
  StyledInputField,
  StyledInputLabel,
  GridBox,
  InputHolder,
  GridBoxBordered,
  BorderBox,
  ControlBox,
  StyledCheckBoxLabel,
  CardCaption,
  CheckFlex,
  CheckBoxTypography,
  ButtonContainer,
} from '../../components/form/Froms.style';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const checkBoxLabels: string[] = [
  'Child Care',
  'Meal Preparation',
  'Light Housekeeping',
  'Tutoring',
  'Pet Minding',
  'Elderly Check-in',
];

interface CheckedState {
  [key: string]: boolean; 
}

export default function RegsiterationFormMom() {
  const [checkedState, setCheckedState] = useState<CheckedState>(
    checkBoxLabels.reduce<CheckedState>((acc, label) => {
      acc[label] = false; 

      return acc;
    }, {})
  );

  const handleCheckboxChange = (label: string) => {
    setCheckedState(prevState => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
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
    cfmPassword: '',
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const fileUrl = URL.createObjectURL(file);

      setFilePath(fileUrl);
    }
  };

  const handleFileExplorerClick = () => {
    document.getElementById('fileInput')?.click();
  };

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isFormValid = () => {
    if (currentStep === 1) {
      return (
        formData.name &&
        formData.user &&
        formData.email &&
        formData.phone &&
        formData.birthday &&
        formData.address &&
        formData.city &&
        formData.postcode &&
        formData.country &&
        formData.password &&
        formData.cfmPassword
      );
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
    if (!isFormValid()) {
      setMessage('Please fill out all fields!');
      setOpen(true);

      return;
    }
    if (formData.password !== formData.cfmPassword) {
      setMessage('Password Do Not Match');
      setOpen(true);

      return;
    }
    if (isFormValid()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const step1 = (
    <>
      <FormHeading>Personal Information</FormHeading>
      <FormDescription>
        Tell us about your family so we can match you with the right Mom Helper.
      </FormDescription>
      <ProfileBox>
        <ProfileWrapper>
          <ProfileImage
            src={filePath || '/registeration-mom/profile.svg'}
            alt='Profile Pic'
            height={140}
            width={140}
          />
          <Image
            src='/registeration-mom/upload.svg'
            alt='Upload'
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
          <Input
            type='file'
            id='fileInput'
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </ProfileWrapper>
      </ProfileBox>

      <GridBox>
        <InputHolder>
          <StyledInputLabel htmlFor='name'>Your Name</StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
          />
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor='user'>User Name</StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='text'
            id='user'
            name='user'
            value={formData.user}
            onChange={handleChange}
          />
        </InputHolder>
      </GridBox>
      <InputHolder>
        <StyledInputLabel htmlFor='email'>Email</StyledInputLabel>
        <StyledInputField
          disableUnderline
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          fullWidth
        />
      </InputHolder>
      <GridBox>
        <InputHolder>
          <StyledInputLabel htmlFor='phone'>Phone Number</StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='text'
            id='phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
          />
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor='birthday'>Date Of Birth</StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='date'
            id='birthday'
            name='birthday'
            value={formData.birthday}
            onChange={handleChange}
          />
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor='address'>Address</StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='text'
            id='address'
            name='address'
            value={formData.address}
            onChange={handleChange}
          />
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor='city'>City</StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='text'
            id='city'
            name='city'
            value={formData.city}
            onChange={handleChange}
          />
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor='postcode'>Postal Code</StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='text'
            id='postcode'
            name='postcode'
            value={formData.postcode}
            onChange={handleChange}
          />
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor='country'>Country</StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='text'
            id='country'
            name='country'
            value={formData.country}
            onChange={handleChange}
          />
        </InputHolder>
        <InputHolder>
          <StyledInputLabel htmlFor='email'>Password</StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
        </InputHolder>
        <InputHolder>
          <StyledInputLabel htmlFor='cfmPassword'>
            Confirm Password
          </StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='password'
            id='cfmPassword'
            name='cfmPassword'
            value={formData.cfmPassword}
            onChange={handleChange}
          />
        </InputHolder>
      </GridBox>
    </>
  );

  const step2 = (
    <>
      <FormHeading>Children & Service Needs</FormHeading>
      <FormDescription>
        Share information about your children and the services you need.
      </FormDescription>
      <StyledInputLabel>Children</StyledInputLabel>
      <GridBoxBordered>
        <InputHolder>
          <StyledInputLabel htmlFor='childNams'>Name</StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='text'
            id='childName'
            name='childName'
            value={formData.password}
            onChange={handleChange}
          />
        </InputHolder>
        <InputHolder>
          <StyledInputLabel htmlFor='childAge'>Age</StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='text'
            id='childAge'
            name='childAge'
            value={formData.password}
            onChange={handleChange}
          />
        </InputHolder>
      </GridBoxBordered>
      <InputHolder>
        <StyledInputLabel htmlFor='specialNotes'>
          Special Notes
        </StyledInputLabel>
        <StyledInputField
          disableUnderline
          type='text'
          id='specialNotes'
          name='specialNotes'
          multiline
        />
      </InputHolder>
      <Button
        width='100%'
        height='54px'
        sx={{
          color: '#005782',
          fontSize: '18px',
          fontWeight: 700,
          marginTop: '16px',
        }}
      >
        <Image
          src='/registeration-mom/add.svg'
          alt='add '
          height={24}
          width={24}
        />
        Add Another Child
      </Button>

      <StyledInputLabel>Services Needed</StyledInputLabel>
      <GridBox>
        {checkBoxLabels.map((box, index) => (
          <ControlBox
            checked={checkedState[box] ?? false}
            key={index}
            
            sx={index > 1 ?   { marginTop: '19px' } : undefined}
            onClick={() => handleCheckboxChange(box)}
          >
            <Checkbox
              {...label}
              checked={checkedState[box]}
              onChange={() => handleCheckboxChange(box)}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon sx={{ color: '#005782' }} />}
            />
            <StyledCheckBoxLabel>{box}</StyledCheckBoxLabel>
          </ControlBox>
        ))}
      </GridBox>
      <InputHolder>
        <StyledInputLabel htmlFor='specialNotes2'>
          Special Notes
        </StyledInputLabel>
        <StyledInputField
          disableUnderline
          type='text'
          id='specialNotes2'
          name='specialNotes2'
          multiline
        />
      </InputHolder>
    </>
  );

  const step3 = (
    <>
      <FormHeading>Payment Details</FormHeading>
      <FormDescription>
        Add your payment method to easily book Mom Helpers.
      </FormDescription>
      <StyledInputLabel>Payment Method</StyledInputLabel>
      <BorderBox>
        <InputHolder>
          <StyledInputLabel htmlFor='expiryDate'>Name on Card</StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='text'
            id='cardName'
            name='cardName'
            value={formData.address}
            onChange={handleChange}
          />
        </InputHolder>
        <InputHolder>
          <StyledInputLabel htmlFor='expiryDate'>Card Number</StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='text'
            id='cardNumber'
            name='cardNumber'
            value={formData.address}
            onChange={handleChange}
          />
        </InputHolder>

        <GridBox>
          <InputHolder>
            <StyledInputLabel htmlFor='expiryDate'>
              Expiry Date
            </StyledInputLabel>
            <StyledInputField
              disableUnderline
              type='text'
              id='expiryDate'
              name='expiryDate'
              value={formData.address}
              onChange={handleChange}
            />
          </InputHolder>
          <InputHolder>
            <StyledInputLabel htmlFor='cvv'>CVV</StyledInputLabel>
            <StyledInputField
              disableUnderline
              type='number'
              id='cvv'
              name='cvv'
              value={formData.phone}
              onChange={handleChange}
            />
          </InputHolder>
        </GridBox>
        <CardCaption>
          Your card will be pre-authorized for payment when you book a Mom
          Helper.
        </CardCaption>
      </BorderBox>

      <CheckFlex>
        <Checkbox
          icon={<CheckBoxOutlineBlankIcon />}
          checkedIcon={<CheckBoxIcon />}
        />
        <CheckBoxTypography>
          Save this card for future bookings
        </CheckBoxTypography>
      </CheckFlex>
      <CheckFlex>
        <Checkbox
          icon={<CheckBoxOutlineBlankIcon />}
          checkedIcon={<CheckBoxIcon />}
        />
        <CheckBoxTypography>
          I agree to the
          <Link href='/terms-of-service'>&nbsp;Terms of Service</Link>&nbsp; and
          <Link href='/privacy-policy'>&nbsp;Privacy Policy</Link>
        </CheckBoxTypography>
      </CheckFlex>
    </>
  );

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          position: 'fixed',
          top: '20%',
          right: '20%',
        }}
      >
        <Alert
          severity='error'
          variant='filled'
          sx={{
            width: '100%',
            fontSize: '25px',
            padding: '15px',
            marginTop: ' 50%',
          }}
        >
          {message}
        </Alert>
      </Snackbar>

      <RegisterationSlider highlight={currentStep} />
      <FormContainer paddingBottom='200px'>
        {currentStep === 1 && step1}
        {currentStep === 2 && step2}
        {currentStep === 3 && step3}

        <ButtonContainer>
          {currentStep > 1 && (
            <Button
              onClick={prevStep}
              borderRadius='15px'
              padding='18px 90px'
              fontSize='18px'
              height='64px'
            >
              Back
            </Button>
          )}
          {currentStep < 3 && (
            <Button
              special
              onClick={nextStep}
              padding='18px 90px'
              fontSize='18px'
              borderRadius='15px'
              height='64px'
            >
              Next
            </Button>
          )}
          {currentStep === 3 && (
            <Button
              onClick={() => alert('Form Submitted!')}
              disabled={!isFormValid()}
              padding='18px 90px'
              fontSize='18px'
              height='64px'
              borderRadius='15px'
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
