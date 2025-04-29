'use client';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { Paper, Snackbar, Input, Alert, Checkbox, MenuItem, Box, Select , Table,TableContainer, TableHead, TableCell, TableRow, TableBody} from '@mui/material';
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
  StyledCheckBoxLabel,
  CardCaption,
  CheckFlex,
  CheckBoxTypography,
  ButtonContainer,
  CertificateUploadBox,
  CertificateBoxWrapper,
  CertificateStyledInputLabel,
  OptionalGridBox,
  StyledSelect,
  BorderBox,
  CheckBorderBox,
  CheckBoxContainer,
  StyledInputFieldCheckBox,
  BorderBoxInternal,
  CustomSelect,
  CustomTableCell
} from '../../components/form/Froms.style';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const checkBoxLabels = [
  'Child Care',
  'Meal Preparation',
  'Light Housekeeping',
  'Tutoring',
  'Pet Minding',
  'Elderly Check-in',
  'Grocery Runs',
  'Tutoring (up to Grade 2)',
  'Laundry / Sundries',
  'Feed My Pet (Separate Visit)',
  'Bringing in your Amazon packages',
  'Water my plants',
  'Taking out the rubbish/trash',
  'Snow shoveling'

];

interface CheckedState {
  [key: string]: boolean; 
}

export default function RegsiterationFormMomHelper() {
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [selectValues, setSelectValues] = useState<Record<string, string>>({});

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
    state: ''
  });

  const handleCheckboxChange = (key: string) => {
    setCheckedState(prev => ({ ...prev, [key]: !prev[key] }));
  };
  
  const handleInputChange = (key: string, value: string) => {
    setInputValues(prev => ({ ...prev, [key]: value }));
  };
  
  const handleSelectChange = (key: string, value: string) => {
    setSelectValues(prev => ({ ...prev, [key]: value }));
  };

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        formData.state
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
        Tell us about yourself so families can get to know you.
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
      </GridBox>
      <InputHolder>
        <StyledInputLabel htmlFor='state'>State/Province</StyledInputLabel>
        <StyledInputField
          disableUnderline
          type='text'
          id='state'
          name='state'
          value={formData.state}
          onChange={handleChange}
        />
      </InputHolder>

      <InputHolder>
        <StyledInputLabel htmlFor='country'>Short Bio</StyledInputLabel>
        <StyledInputField
          disableUnderline
          type='text'
          id='country'
          name='country'
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
        Share your qualifications and the services you can provide.
      </FormDescription>

      <StyledInputLabel>Services You can Provide</StyledInputLabel>
      <BorderBox>
        <BorderBoxInternal>

          <Box sx={{display: 'flex', justifyContent: 'space-between', padding: '20px 0' ,borderBottom: '1px solid #DFEAF2'}}>

            <StyledCheckBoxLabel sx={{marginLeft: '18px',}}>Services</StyledCheckBoxLabel>
            <Box sx={{display: 'flex', marginRight: '19px', gap: '20px'}}>

              <StyledCheckBoxLabel style={{width: '120px' , textAlign: 'center'}}>Rate</StyledCheckBoxLabel>
              <StyledCheckBoxLabel style={{width: '120px', textAlign: 'center'}}>Duration</StyledCheckBoxLabel>
            </Box>
          </Box>
          <Box sx={{padding: '18px 12px'}}>

            {checkBoxLabels.map((box, index) => (
              <CheckBorderBox key={box} index={index}>
                <CheckBoxContainer>
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon />}
                    checkedIcon={<CheckBoxIcon sx={{ color: '#005782' }} />}
                    checked={checkedState[box] || false}
                    onChange={() => handleCheckboxChange(box)}
                  />
                  <StyledCheckBoxLabel>{box}</StyledCheckBoxLabel>
                </CheckBoxContainer>

                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '11px' }}>
                  <StyledInputFieldCheckBox
                    disableUnderline
                    type="text"
                    id={box}
                    name={box}
                    value={inputValues[box] || ''}
                    onChange={(e) => handleInputChange(box, e.target.value)}
                  />
                  <CustomSelect
                    label="Time Unit"
                    value={selectValues[box] || 'hrs'}
                    onChange={(e) => handleSelectChange(box, e.target.value as string)}
                  >
                    <MenuItem value="hrs">hrs</MenuItem>
                    <MenuItem value="mins">mins</MenuItem>
                  </CustomSelect>
                </Box>
              </CheckBorderBox>
            ))}

          </Box>

        </BorderBoxInternal>
      </BorderBox>

      <StyledInputLabel>Custom Packages</StyledInputLabel>
      <BorderBox>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <CustomTableCell>Package Name</CustomTableCell>
                <CustomTableCell>Included Services</CustomTableCell>
                <CustomTableCell>Prices</CustomTableCell>
                <CustomTableCell>Sessions (1hr)</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow >
                <TableCell>Weekend Boost</TableCell>
                <TableCell>LighHousekeeping, Childcare, Pet Minding</TableCell>
                <TableCell><StyledInputField 
                  disableUnderline
                /></TableCell>
                <TableCell><StyledInputField 
                  disableUnderline
                /></TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </TableContainer>
        <Button width='100%' style={{marginTop: '16px'}}>Add Package</Button>
      </BorderBox>
      <CertificateBoxWrapper>
        <CertificateStyledInputLabel>
          Government Issued ID
        </CertificateStyledInputLabel>
        <CertificateUploadBox>
          <Image
            src='/registeration-mom/upload.svg'
            height={20}
            width={20}
            alt='Upload Icon'
          />
          <StyledCheckBoxLabel>Upload Certificate</StyledCheckBoxLabel>
        </CertificateUploadBox>
      </CertificateBoxWrapper>
      <CertificateBoxWrapper>
        <CertificateStyledInputLabel>
          Police Vulnerable Sector Check
        </CertificateStyledInputLabel>
        <CertificateUploadBox>
          <Image
            src='/registeration-mom/upload.svg'
            height={20}
            width={20}
            alt='Upload Icon'
          />
          <StyledCheckBoxLabel>Upload Certificate</StyledCheckBoxLabel>
        </CertificateUploadBox>
      </CertificateBoxWrapper>
      <CertificateBoxWrapper>
        <CertificateStyledInputLabel>
          First Aid Certification
        </CertificateStyledInputLabel>
        <CertificateUploadBox>
          <Image
            src='/registeration-mom/upload.svg'
            height={20}
            width={20}
            alt='Upload Icon'
          />
          <StyledCheckBoxLabel>Upload Certificate</StyledCheckBoxLabel>
        </CertificateUploadBox>
      </CertificateBoxWrapper>
    </>
  );

  const step3 = (
    <>
      <FormHeading>Payment Details</FormHeading>
      <FormDescription>
        How would you like to receive payments for your services?
      </FormDescription>

      <InputHolder>
        <StyledInputLabel>Payment Method</StyledInputLabel>
        <StyledSelect labelId='select-label' id='select' fullWidth>
          <MenuItem value={10} selected>
            Direct Deposit
          </MenuItem>
          <MenuItem value={20}>COD</MenuItem>
          <MenuItem value={30}>Credit Card</MenuItem>
        </StyledSelect>
      </InputHolder>
      <InputHolder>
        <StyledInputLabel htmlFor='tfrEmail'>
          Email for a e-Transfer
        </StyledInputLabel>
        <CardCaption>Payments will be sent to this email address.</CardCaption>
        <StyledInputField
          disableUnderline
          type='email'
          id='tfrEmail'
          name='tfrEmail'
        />
      </InputHolder>

      <StyledInputLabel>Direct Deposit Information (Optional)</StyledInputLabel>

      <OptionalGridBox>
        <InputHolder>
          <StyledInputLabel htmlFor='transitNumber'>
            Transit Number
          </StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='number'
            id='transitNumber'
            name='transitNumber'
          />
        </InputHolder>
        <InputHolder>
          <StyledInputLabel htmlFor='institutionNumber'>
            Institutuon Number
          </StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='number'
            id='institutionNumber'
            name='institutionNumber'
          />
        </InputHolder>
        <InputHolder>
          <StyledInputLabel htmlFor='accNumber'>
            Account Number
          </StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='number'
            id='accNumber'
            name='accNumber'
          />
        </InputHolder>
      </OptionalGridBox>

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
        <ApplicationSatus />
      </FormContainer>
    </>
  );
}
