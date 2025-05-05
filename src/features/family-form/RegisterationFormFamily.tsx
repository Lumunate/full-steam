'use client';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import {
  Input,
  Checkbox,
  Box,
  Typography,
  MenuItem,
  CircularProgress,
  InputAdornment
} from '@mui/material';
import { Gender, UserRole } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect, ChangeEvent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import ApplicationSatus from '@/components/application-status/ApplicationStatus';
import { Button } from '@/components/buttons/Button.style';
import RegisterationSlider from '@/components/registeration-slider/RegisterationSlider';
import { useSnackbar } from '@/components/snackbar';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { useUserRegistration } from '@/hooks/useUserRegistration';
import { Link } from '@/i18n/routing';
import { useCloudinaryUpload } from '@/lib/handlers/storage/lib/cloudinary/hooks/useCloudinaryUpload';
import { Service } from '@/types/services';

import {
  PopUpModal,
  PopupOverlay,
  StyledSelect,
} from '../../components/form/Froms.style';
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
import PrivacyandPolicy from '../legal-pages/privacy-policy/PrivacyPolicy';
import TermsAndServices from '../legal-pages/terms-service/TermService';

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
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const { uploadFile, isUploading } = useCloudinaryUpload();
  const { register, registrationState } = useUserRegistration();

  const { data: services } = useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await axios.get('/api/services');

      return response.data;
    },
  });
  const [checkedState, setCheckedState] = useState<CheckedState>({});
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(null);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

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

  const handleTerms = () => {
    setTerms(!terms);
  };

  const handlePrivacy = () => {
    setPrivacy(!privacy);
  };

  const [filePath, setFilePath] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [children, setChildren] = useState<Child[]>([
    { name: '', age: 0, specialNotes: '' },
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
    state: '',
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
  const checkUsernameAvailability = async (username: string) => {
    if (!username || username.length < 3) {
      setIsUsernameAvailable(null);

      return;
    }
    setIsCheckingUsername(true);
    try {
      const response = await axios.get(`/api/user/check-availability?field=username&value=${encodeURIComponent(username)}`);

      setIsUsernameAvailable(response.data.available);
    } catch {
      setIsUsernameAvailable(null);
    } finally {
      setIsCheckingUsername(false);
    }
  };
  const checkEmailAvailability = async (email: string) => {
    if (!email || !email.includes('@')) {
      setIsEmailAvailable(null);

      return;
    }
    setIsCheckingEmail(true);
    try {
      const response = await axios.get(`/api/user/check-availability?field=email&value=${encodeURIComponent(email)}`);

      setIsEmailAvailable(response.data.available);
    } catch {
      setIsEmailAvailable(null);
    } finally {
      setIsCheckingEmail(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.username && formData.username.length >= 3) {
        checkUsernameAvailability(formData.username);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.username]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.email && formData.email.includes('@')) {
        checkEmailAvailability(formData.email);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.email]);
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LcNbygrAAAAAD48zAGw3fsjHZtZSizUeQsJDcwi';
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const fileUrl = URL.createObjectURL(file);

      setFilePath(fileUrl);

      try {
        const uploadedUrl = await uploadFile(file);

        setUploadedImageUrl(uploadedUrl);
      } catch {
        showSnackbar({
          type: 'error',
          message: 'Failed to upload image. Please try again.'
        });
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

  const updateChild = (index: number, field: keyof Child, value: any) => {
    const updatedChildren = [...children];

    if (field === 'age' && typeof value === 'string') {
      value = parseInt(value) || 0;
    }
    updatedChildren[index] = {
      ...updatedChildren[index],
      [field]: value,
    } as Child;
    setChildren(updatedChildren);
  };
  const addAnotherChild = () => {
    setChildren([...children, { name: '', age: 0, specialNotes: '' }]);
  };
  const { isVerified, isVerifying, verifyRecaptcha, error: recaptchaError } = useRecaptcha();

  const handleCheckboxToggle = (field: 'agreeToTerms' | 'savePaymentCard') => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  const isFormValid = () => {
    if (currentStep === 1) {
      const phoneRegex = /^\d{10}$/;
      const isValidPhone = phoneRegex.test(formData.phoneNumber);

      return (
        formData.firstName &&
        formData.lastName &&
        formData.username &&
        formData.username.length >= 3 &&
        isUsernameAvailable === true &&
        formData.email &&
        formData.email.includes('@') &&
        isEmailAvailable === true &&
        isValidPhone &&
        formData.dateOfBirth &&
        formData.address &&
        formData.city &&
        formData.postalCode &&
        formData.country &&
        formData.password &&
        formData.password.length >= 6 &&
        formData.cfmPassword
      );
    }
    if (currentStep === 2) {
      const hasValidChildren = children.some(
        child => child.name && child.age > 0,
      );
      const hasSelectedServices = Object.values(checkedState).some(
        checked => checked,
      );

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

  const nextStep = async () => {
    if (!isFormValid()) {
      if (currentStep === 1 && !/^\d{10}$/.test(formData.phoneNumber)) {
        showSnackbar({
          type: 'error',
          message: 'Phone number must be exactly 10 digits'
        });
      } else {
        showSnackbar({
          type: 'error',
          message: 'Please fill out all required fields!'
        });
      }

      return;
    }

    if (currentStep === 1 && formData.password !== formData.cfmPassword) {
      showSnackbar({
        type: 'error',
        message: 'Passwords do not match'
      });

      return;
    }

    setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

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
      state: formData.state,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      agreeToTerms: formData.agreeToTerms,
      role: UserRole.USER,
      children: validChildren,
      serviceIds: selectedServiceIds,
      image: uploadedImageUrl,
      paymentCardName: formData.paymentCardName,
      paymentCardNumber: formData.paymentCardNumber,
      paymentCardExpiry: formData.paymentCardExpiry,
      paymentCardCvv: formData.paymentCardCvv,
      savePaymentCard: formData.savePaymentCard,
      saveForFuture: false,
      proStatus: false,
    };

    register(registrationData);
  };

  useEffect(() => {
    if (registrationState.isSuccess) {
      router.push('/en/login?role=mom');
    } else if (registrationState.error) {
      showSnackbar({
        type: 'error',
        message: registrationState.error
      });
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
            error={formData.username.length >= 3 && isUsernameAvailable === false}
            endAdornment={
              formData.username.length >= 3 && (
                <InputAdornment position="end">
                  {isCheckingUsername ? (
                    <CircularProgress size={20} />
                  ) : isUsernameAvailable === true ? (
                    <CheckCircleIcon color="success" />
                  ) : isUsernameAvailable === false ? (
                    <ErrorIcon color="error" />
                  ) : null}
                </InputAdornment>
              )
            }
          />
          {formData.username.length >= 3 && isUsernameAvailable === false && (
            <Typography color="error" variant="caption">
              Username is already taken
            </Typography>
          )}
          {formData.username.length >= 3 && isUsernameAvailable === true && (
            <Typography color="success" variant="caption">
              Username is available
            </Typography>
          )}
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor='gender'>Gender</StyledInputLabel>
          <StyledSelect
            value={formData.gender}
            onChange={handleSelectChange}
            name='gender'
            fullWidth
            variant='standard'
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
          error={formData.email.includes('@') && isEmailAvailable === false}
          endAdornment={
            formData.email.includes('@') && (
              <InputAdornment position="end">
                {isCheckingEmail ? (
                  <CircularProgress size={20} />
                ) : isEmailAvailable === true ? (
                  <CheckCircleIcon color="success" />
                ) : isEmailAvailable === false ? (
                  <ErrorIcon color="error" />
                ) : null}
              </InputAdornment>
            )
          }
        />
        {formData.email.includes('@') && isEmailAvailable === false && (
          <Typography color="error" variant="caption">
            Email is already registered
          </Typography>
        )}
        {formData.email.includes('@') && isEmailAvailable === true && (
          <Typography color="success" variant="caption">
            Email is available
          </Typography>
        )}
      </InputHolder>
      <GridBox>
        <InputHolder>
          <StyledInputLabel htmlFor='phoneNumber'>
            Phone Number
          </StyledInputLabel>
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
          <StyledInputLabel htmlFor='dateOfBirth'>
            Date Of Birth
          </StyledInputLabel>
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
            error={!!formData.password && formData.password.length < 6}
          />
          {formData.password && formData.password.length < 6 && (
            <Typography color="error" variant="caption">
              Password must be at least 6 characters
            </Typography>
          )}
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
          <InputHolder
            sx={{
              '@media (max-width: 600px)': {
                gridColumn: 'span 2',
              },
            }}
          >
            <StyledInputLabel htmlFor={`childName-${index}`}>
              Name
            </StyledInputLabel>
            <StyledInputField
              disableUnderline
              type='text'
              id={`childName-${index}`}
              name={`childName-${index}`}
              value={child.name}
              onChange={e => updateChild(index, 'name', e.target.value)}
            />
          </InputHolder>
          <InputHolder
            sx={{
              '@media (max-width: 600px)': {
                gridColumn: 'span 2',
              },
            }}
          >
            <StyledInputLabel htmlFor={`childAge-${index}`}>
              Age
            </StyledInputLabel>
            <StyledInputField
              disableUnderline
              type='number'
              id={`childAge-${index}`}
              name={`childAge-${index}`}
              value={child.age}
              onChange={e => updateChild(index, 'age', e.target.value)}
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
              onChange={e => updateChild(index, 'specialNotes', e.target.value)}
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
        {services &&
          services.map((service, index) => (
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
          <StyledInputLabel htmlFor='paymentCardName'>
            Name on Card
          </StyledInputLabel>
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
          <StyledInputLabel htmlFor='paymentCardNumber'>
            Card Number
          </StyledInputLabel>
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
        <CheckBoxTypography sx={{ display: 'flex' }}>
          I agree to the
          <Typography onClick={handleTerms} sx={{ cursor: 'pointer' }}>
            &nbsp;Terms of Service
          </Typography>
          &nbsp; and
          <Typography onClick={handlePrivacy} sx={{ cursor: 'pointer' }}>
            &nbsp;Privacy Policy
          </Typography>
        </CheckBoxTypography>
      </CheckFlex>
      <Box sx={{ marginTop: '20px', marginBottom: '20px', width: '100%' }}>
        <ReCAPTCHA
          sitekey={recaptchaSiteKey}
          onChange={handleRecaptchaChange}
        />
        {recaptchaError && (
          <Typography color='error' variant='body2' sx={{ mt: 1 }}>
            {recaptchaError}
          </Typography>
        )}
        {!isVerified && (
          <Typography color='primary' variant='body2' sx={{ mt: 1 }}>
            Please complete the CAPTCHA verification to enable the submit button
          </Typography>
        )}
        {terms && (
          <PopupOverlay onClick={handleTerms}>
            <PopUpModal>
              <TermsAndServices />
            </PopUpModal>
          </PopupOverlay>
        )}
        {privacy && (
          <PopupOverlay onClick={handlePrivacy}>
            <PopUpModal>
              <PrivacyandPolicy />
            </PopUpModal>
          </PopupOverlay>
        )}
      </Box>
    </>
  );

  return (
    <>
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
              disabled={
                !isFormValid() ||
                !isVerified ||
                registrationState.isLoading ||
                isUploading
              }
              padding='18px 90px'
              fontSize='18px'
              height='64px'
              borderRadius='15px'
              special
            >
              {registrationState.isLoading || isUploading
                ? 'Submitting...'
                : 'Submit'}
            </Button>
          )}
        </ButtonContainer>
        <ApplicationSatus isMom />
      </FormContainer>
    </>
  );
}
