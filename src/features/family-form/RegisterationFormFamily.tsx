'use client';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Snackbar, Input, Alert, Checkbox, Box, Typography, MenuItem, Select } from '@mui/material';
import { Gender, UserRole } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect, ChangeEvent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { PopUpModal, PopupOverlay, StyledSelect } from '../../components/form/Froms.style';
import ApplicationSatus from '@/components/application-status/ApplicationStatus';
import { Button } from '@/components/buttons/Button.style';
import RegisterationSlider from '@/components/registeration-slider/RegisterationSlider';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { useUserRegistration } from '@/hooks/useUserRegistration';
import { Link } from '@/i18n/routing';
import { useCloudinaryUpload } from '@/lib/handlers/storage/lib/cloudinary/hooks/useCloudinaryUpload';
import { Service } from '@/types/services';

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
  ButtonContainer
} from '../../components/form/Froms.style';
import TermsAndServices from '../legal-pages/terms-service/TermService';
import PrivacyandPolicy from '../legal-pages/privacy-policy/PrivacyPolicy';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface Child {
  name: string;
  age: number;
  specialNotes?: string;
}

interface CheckedState {
  [key: string]: boolean; 
}

export default function RegsiterationFormMom() {
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const router = useRouter();
  const { uploadFile, isUploading } = useCloudinaryUpload();
  const { register, registrationState } = useUserRegistration();


  const handleTerms = () =>{
    setTerms(!terms);
  }
  const handlePrivacy = () =>{
    setPrivacy(!privacy);
  }
  
  // Fetch services from API
  const { data: services } = useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await axios.get('/api/services');

      return response.data;
    }
  });
  
  // Set services in checked state when they're loaded
  const [checkedState, setCheckedState] = useState<CheckedState>({});
  
  useEffect(() => {
    if (services && services.length > 0) {
      const initialState = services.reduce<CheckedState>((acc, service) => {
        acc[service.id] = false;

        return acc;
      }, {});

      setCheckedState(initialState);
    }
  }, [services]);
  
  const handleCheckboxChange = (serviceId: string) => {
    setCheckedState(prevState => ({
      ...prevState,
      [serviceId]: !prevState[serviceId],
    }));
  };

  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [filePath, setFilePath] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [children, setChildren] = useState<Child[]>([
    { name: '', age: 0, specialNotes: '' }
  ]);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: '',
    dateOfBirth: '',
    city: '',
    postalCode: '',
    country: '',
    state: '', // Added state field
    cfmPassword: '',
    gender: Gender.OTHER as Gender,
    agreeToTerms: false,
    savePaymentCard: false,
    paymentCardName: '',
    paymentCardNumber: '',
    paymentCardExpiry: '',
    paymentCardCvv: '',
  });

  const [currentStep, setCurrentStep] = useState(1);

  // Handle file upload with Cloudinary
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Show local preview
      const fileUrl = URL.createObjectURL(file);

      setFilePath(fileUrl);
      
      try {
        // Upload to Cloudinary
        const uploadedUrl = await uploadFile(file);

        setUploadedImageUrl(uploadedUrl);
      } catch {
        setMessage('Failed to upload image. Please try again.');
        setOpen(true);
      }
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
  
  const handleSelectChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  // Handle child data changes
  const updateChild = (index: number, field: keyof Child, value: any) => {
    const updatedChildren = [...children];

    if (field === 'age' && typeof value === 'string') {
      value = parseInt(value) || 0;
    }
    updatedChildren[index] = { 
      ...updatedChildren[index], 
      [field]: value 
    } as Child;
    setChildren(updatedChildren);
  };
  
  // Add another child
  const addAnotherChild = () => {
    setChildren([...children, { name: '', age: 0, specialNotes: '' }]);
  };
  
  const { isVerified, isVerifying, verifyRecaptcha, error: recaptchaError } = useRecaptcha();
  
  const handleCheckboxToggle = (field: 'agreeToTerms' | 'savePaymentCard') => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const isFormValid = () => {
    if (currentStep === 1) {
      // Phone number must be exactly 10 digits
      const phoneRegex = /^\d{10}$/;
      const isValidPhone = phoneRegex.test(formData.phoneNumber);
      
      return (
        formData.firstName &&
        formData.lastName &&
        formData.username &&
        formData.email &&
        isValidPhone &&
        formData.dateOfBirth &&
        formData.address &&
        formData.city &&
        formData.postalCode &&
        formData.country &&
        formData.password &&
        formData.cfmPassword
      );
    }
    if (currentStep === 2) {
      const hasValidChildren = children.some(child => child.name && child.age > 0);
      const hasSelectedServices = Object.values(checkedState).some(checked => checked);

      return hasValidChildren && hasSelectedServices;
    }
    if (currentStep === 3) {
      return (
        formData.paymentCardName &&
        formData.paymentCardNumber &&
        formData.paymentCardExpiry &&
        formData.paymentCardCvv &&
        formData.agreeToTerms &&
        isVerified
      );
    }

    return false;
  };
  
  const handleRecaptchaChange = async (token: string | null) => {
    if (token) {
      await verifyRecaptcha(token);
    }
  };

  // Check if username or email already exists
  const checkUsernameAndEmail = async () => {
    try {
      const response = await axios.post('/api/user/check-exists', {
        username: formData.username,
        email: formData.email
      });
      
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 409) {
        return error.response.data;
      }

      return { exists: false };
    }
  };

  const nextStep = async () => {
    if (!isFormValid()) {
      if (currentStep === 1 && !/^\d{10}$/.test(formData.phoneNumber)) {
        setMessage('Phone number must be exactly 10 digits');
      } else {
        setMessage('Please fill out all required fields!');
      }
      setOpen(true);

      return;
    }
    
    if (currentStep === 1 && formData.password !== formData.cfmPassword) {
      setMessage('Passwords do not match');
      setOpen(true);

      return;
    }
    
    // Check username and email uniqueness when moving from step 1
    if (currentStep === 1) {
      const result = await checkUsernameAndEmail();

      if (result.exists) {
        setMessage(result.message || 'Username or email already exists. Please choose another.');
        setOpen(true);

        return;
      }
    }
    
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  // Handle form submission
  const handleSubmit = () => {
    const selectedServiceIds = Object.entries(checkedState)
      .filter(([_, isChecked]) => isChecked)
      .map(([serviceId]) => serviceId);
    
    const validChildren = children.filter(child => child.name && child.age > 0);
    
    const registrationData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      country: formData.country,
      state: formData.state, // Include state in registration data
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      agreeToTerms: formData.agreeToTerms,
      role: UserRole.USER, // For family registration
      children: validChildren,
      serviceIds: selectedServiceIds,
      image: uploadedImageUrl,
      paymentCardName: formData.paymentCardName,
      paymentCardNumber: formData.paymentCardNumber,
      paymentCardExpiry: formData.paymentCardExpiry,
      paymentCardCvv: formData.paymentCardCvv,
      savePaymentCard: formData.savePaymentCard,
      saveForFuture: false, // Default value
      proStatus: false, // Default value
    };
    
    register(registrationData);
  };
  
  // Redirect after successful registration
  useEffect(() => {
    if (registrationState.isSuccess) {
      router.push('/en/login?role=mom');
    } else if (registrationState.error) {
      setMessage(registrationState.error);
      setOpen(true);
    }
  }, [registrationState.isSuccess, registrationState.error, router]);

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
          <StyledInputLabel htmlFor='firstName'>First Name</StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='text'
            id='firstName'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
          />
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor='lastName'>Last Name</StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='text'
            id='lastName'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
          />
        </InputHolder>
        
        <InputHolder>
          <StyledInputLabel htmlFor='username'>User Name</StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='text'
            id='username'
            name='username'
            value={formData.username}
            onChange={handleChange}
          />
        </InputHolder>
        
        <InputHolder>
          <StyledInputLabel htmlFor='gender'>Gender</StyledInputLabel>
          <StyledSelect
            value={formData.gender}
            onChange={handleSelectChange}
            name="gender"
            fullWidth
            variant="standard"
            disableUnderline
          >
            <MenuItem value={Gender.MALE}>Male</MenuItem>
            <MenuItem value={Gender.FEMALE}>Female</MenuItem>
            <MenuItem value={Gender.OTHER}>Other</MenuItem>
          </StyledSelect>
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
          <StyledInputLabel htmlFor='phoneNumber'>Phone Number</StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='text'
            id='phoneNumber'
            name='phoneNumber'
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor='dateOfBirth'>Date Of Birth</StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='date'
            id='dateOfBirth'
            name='dateOfBirth'
            value={formData.dateOfBirth}
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
          <StyledInputLabel htmlFor='postalCode'>Postal Code</StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='text'
            id='postalCode'
            name='postalCode'
            value={formData.postalCode}
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
          <StyledInputLabel htmlFor='password'>Password</StyledInputLabel>
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
      
      {children.map((child, index) => (
        <GridBoxBordered key={index} style={{ marginBottom: '20px' }}>
          <InputHolder sx={{'@media (max-width: 600px)':{
          gridColumn: 'span 2',
          }}} >
            <StyledInputLabel htmlFor={`childName-${index}`}>Name</StyledInputLabel>
            <StyledInputField
              disableUnderline
              type='text'
              id={`childName-${index}`}
              name={`childName-${index}`}
              value={child.name}
              onChange={(e) => updateChild(index, 'name', e.target.value)}
            />
          </InputHolder>
          <InputHolder sx={{'@media (max-width: 600px)':{
          gridColumn: 'span 2',
          }}}>
            <StyledInputLabel htmlFor={`childAge-${index}`}>Age</StyledInputLabel>
            <StyledInputField
              disableUnderline
              type='number'
              id={`childAge-${index}`}
              name={`childAge-${index}`}
              value={child.age}
              onChange={(e) => updateChild(index, 'age', e.target.value)}
            />
          </InputHolder>
          <InputHolder style={{ gridColumn: '1 / span 2' }}>
            <StyledInputLabel htmlFor={`specialNotes-${index}`}>
              Special Notes
            </StyledInputLabel>
            <StyledInputField
              disableUnderline
              type='text'
              id={`specialNotes-${index}`}
              name={`specialNotes-${index}`}
              value={child.specialNotes || ''}
              onChange={(e) => updateChild(index, 'specialNotes', e.target.value)}
              multiline
            />
          </InputHolder>
        </GridBoxBordered>
      ))}
      
      <Button
        width='100%'
        height='54px'
        sx={{
          color: '#005782',
          fontSize: '18px',
          fontWeight: 700,
          marginBottom: '30px',
        }}
        onClick={addAnotherChild}
      >
        <Image
          src='/registeration-mom/add.svg'
          alt='add'
          height={24}
          width={24}
        />
        Add Another Child
      </Button>

      <StyledInputLabel>Services Needed</StyledInputLabel>
      <GridBox>
        {services && services.map((service, index) => (
          <ControlBox
            checked={checkedState[service.id] ?? false}
            key={index}
            sx={index > 1 ? { marginTop: '19px' } : undefined}
            onClick={() => handleCheckboxChange(service.id)}
          >
            <Checkbox
              {...label}
              checked={checkedState[service.id] ?? false}
              onChange={() => handleCheckboxChange(service.id)}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon sx={{ color: '#005782' }} />}
            />
            <StyledCheckBoxLabel>{service.name}</StyledCheckBoxLabel>
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
          <StyledInputLabel htmlFor='paymentCardName'>Name on Card</StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='text'
            id='paymentCardName'
            name='paymentCardName'
            value={formData.paymentCardName}
            onChange={handleChange}
          />
        </InputHolder>
        <InputHolder>
          <StyledInputLabel htmlFor='paymentCardNumber'>Card Number</StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='text'
            id='paymentCardNumber'
            name='paymentCardNumber'
            value={formData.paymentCardNumber}
            onChange={handleChange}
          />
        </InputHolder>

        <GridBox>
          <InputHolder>
            <StyledInputLabel htmlFor='paymentCardExpiry'>
              Expiry Date
            </StyledInputLabel>
            <StyledInputField
              disableUnderline
              type='text'
              id='paymentCardExpiry'
              name='paymentCardExpiry'
              placeholder='MM/YY'
              value={formData.paymentCardExpiry}
              onChange={handleChange}
            />
          </InputHolder>
          <InputHolder>
            <StyledInputLabel htmlFor='paymentCardCvv'>CVV</StyledInputLabel>
            <StyledInputField
              disableUnderline
              type='number'
              id='paymentCardCvv'
              name='paymentCardCvv'
              value={formData.paymentCardCvv}
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
          checked={formData.savePaymentCard}
          onChange={() => handleCheckboxToggle('savePaymentCard')}
        />
        <CheckBoxTypography>
          Save this card for future bookings
        </CheckBoxTypography>
      </CheckFlex>
      <CheckFlex>
        <Checkbox
          icon={<CheckBoxOutlineBlankIcon />}
          checkedIcon={<CheckBoxIcon />}
          checked={formData.agreeToTerms}
          onChange={() => handleCheckboxToggle('agreeToTerms')}
        />
        <CheckBoxTypography sx={{display: 'flex'}}>
          I agree to the
          <Typography onClick={handleTerms} sx={{cursor: 'pointer'}}>&nbsp;Terms of Service</Typography>&nbsp; and
          <Typography onClick={handlePrivacy} sx={{cursor: 'pointer'}}>&nbsp;Privacy Policy</Typography>
        </CheckBoxTypography>
      </CheckFlex>
      <Box sx={{ marginTop: '20px', marginBottom: '20px', width: '100%' }}>
        <ReCAPTCHA
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={handleRecaptchaChange}
        />
        {recaptchaError && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {recaptchaError}
          </Typography>
        )}
        {!isVerified && (
          <Typography color="primary" variant="body2" sx={{ mt: 1 }}>
            Please complete the CAPTCHA verification to enable the submit button
          </Typography>
        )}
        {terms && 
        <PopupOverlay onClick={handleTerms}>
<PopUpModal >
<TermsAndServices/>
</PopUpModal>
 </PopupOverlay>
}
{privacy &&

        <PopupOverlay onClick={handlePrivacy}>
<PopUpModal >
<PrivacyandPolicy/>
</PopUpModal>
 </PopupOverlay>

}
      </Box>
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
              onClick={handleSubmit}
              disabled={!isFormValid() || !isVerified || registrationState.isLoading || isUploading}
              padding='18px 90px'
              fontSize='18px'
              height='64px'
              borderRadius='15px'
              special
            >
              {registrationState.isLoading || isUploading ? 'Submitting...' : 'Submit'}
            </Button>
          )}
        </ButtonContainer>
        <ApplicationSatus isMom />
      </FormContainer>
    </>
  );
}