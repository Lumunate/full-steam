'use client';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { 
  Paper, 
  Snackbar, 
  Alert, 
  Checkbox, 
  MenuItem, 
  Box, 
  Select, 
  Table,
  TableContainer, 
  TableHead, 
  TableCell, 
  TableRow, 
  TableBody,
  CircularProgress,
  Typography,
  Chip,
  Autocomplete,
  TextField,
  InputAdornment
} from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import ApplicationSatus from '@/components/application-status/ApplicationStatus';
import { Button } from '@/components/buttons/Button.style';
import RegisterationSlider from '@/components/registeration-slider/RegisterationSlider';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { useServices } from '@/hooks/useServices';
import { useUserRegistration } from '@/hooks/useUserRegistration';
import { Link } from '@/i18n/routing';
import { useCloudinaryUpload } from '@/lib/handlers/storage/lib/cloudinary/hooks/useCloudinaryUpload';
import { RegisterUserInput } from '@/types/auth/register-user';
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
  CustomTableCell,
  PopUpModal,
  PopupOverlay
} from '../../components/form/Froms.style';
import TermsAndServices from '../legal-pages/terms-service/TermService';
import PrivacyandPolicy from '../legal-pages/privacy-policy/PrivacyPolicy';

// Types for custom package and service pricing
interface ServicePricing {
  serviceId: string;
  price: number;
  duration: string;
}

interface PackageData {
  name: string;
  price: number;
  serviceIds: string[];
  notes?: string;
}

export default function RegsiterationFormMomHelper() {
   const [terms, setTerms] = useState(false);
    const [privacy, setPrivacy] = useState(false);
  const router = useRouter();
  const { services, isLoading: servicesLoading } = useServices();
  const { uploadFile, isUploading } = useCloudinaryUpload();
  const { verifyRecaptcha, isVerified } = useRecaptcha();
  const { register, registrationState } = useUserRegistration();

  const [currentStep, setCurrentStep] = useState(1);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [profilePreview, setProfilePreview] = useState('');
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  
  // Username and email availability state
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(null);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  
  // Selected services with pricing
  const [selectedServices, setSelectedServices] = useState<Record<string, ServicePricing>>({});
  
  // Packages state
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [newPackage, setNewPackage] = useState<PackageData>({
    name: '',
    price: 0,
    serviceIds: [],
    notes: ''
  });
  
  // Document URLs
  const [documents, setDocuments] = useState({
    governmentIdDocumentUrl: '',
    policeCheckDocumentUrl: '',
    firstAidCertificate: '',
    image: ''
  });
  
  // User form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    gender: 'FEMALE' as const,
    dateOfBirth: '',
    shortBio: '',
    hourlyRate: 0,
    role: 'HELPER' as const,
    proStatus: false, // Explicitly set to false for HELPER role
    agreeToTerms: false,
    paymentMethod: 'E_TRANSFER' as 'E_TRANSFER' | 'DIRECT_DEPOSIT',
    eTransferEmail: '',
    bankTransitNumber: '',
    bankInstitutionNumber: '',
    bankAccountNumber: '',
  });

  
  const handleTerms = () =>{
    setTerms(!terms);
  }
  const handlePrivacy = () =>{
    setPrivacy(!privacy);
  }

  // Check username availability
  const checkUsernameAvailability = async (username: string) => {
    if (!username || username.length < 3) {
      setIsUsernameAvailable(null);

      return;
    }
    
    setIsCheckingUsername(true);
    try {
      const response = await axios.get(`/api/user/check-availability?field=username&value=${encodeURIComponent(username)}`);

      setIsUsernameAvailable(response.data.available);
    } catch  {
      setIsUsernameAvailable(null);
    } finally {
      setIsCheckingUsername(false);
    }
  };

  // Check email availability
  const checkEmailAvailability = async (email: string) => {
    if (!email || !email.includes('@')) {
      setIsEmailAvailable(null);

      return;
    }
    
    setIsCheckingEmail(true);
    try {
      const response = await axios.get(`/api/user/check-availability?field=email&value=${encodeURIComponent(email)}`);

      setIsEmailAvailable(response.data.available);
    } catch  {
      setIsEmailAvailable(null);
    } finally {
      setIsCheckingEmail(false);
    }
  };

  // Handle change for form inputs
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Check username and email availability when they change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.username && formData.username.length >= 3) {
        checkUsernameAvailability(formData.username);
      }
    }, 500); // Debounce for 500ms
    
    return () => clearTimeout(timer);
  }, [formData.username]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.email && formData.email.includes('@')) {
        checkEmailAvailability(formData.email);
      }
    }, 500); // Debounce for 500ms
    
    return () => clearTimeout(timer);
  }, [formData.email]);

  // Service selection handlers
  const handleServiceSelect = (serviceId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedServices(prev => ({
        ...prev,
        [serviceId]: {
          serviceId,
          price: 0,
          duration: '1 hr'
        }
      }));
    } else {
      const { [serviceId]: _, ...rest } = selectedServices;

      setSelectedServices(rest);
    }
  };

  const handleServicePriceChange = (serviceId: string, value: string) => {
    const price = parseFloat(value) || 0;

    setSelectedServices(prev => ({
      ...prev,
      [serviceId]: {
        serviceId: prev[serviceId]?.serviceId || serviceId,
        price,
        duration: prev[serviceId]?.duration || '1 hr'
      }
    }));
  };

  const handleServiceDurationChange = (serviceId: string, duration: string) => {
    setSelectedServices(prev => ({
      ...prev,
      [serviceId]: {
        serviceId: prev[serviceId]?.serviceId || serviceId,
        price: prev[serviceId]?.price || 0,
        duration
      }
    }));
  };

  // Package handlers - Improved version with single input field
  const handlePackageNameChange = (value: string) => {
    setNewPackage(prev => ({ ...prev, name: value }));
  };

  const handlePackagePriceChange = (value: string) => {
    const price = parseFloat(value) || 0;

    setNewPackage(prev => ({ ...prev, price }));
  };

  const handlePackageNotesChange = (value: string) => {
    setNewPackage(prev => ({ ...prev, notes: value }));
  };

  const handleAddService = (service: Service | null) => {
    if (service && !newPackage.serviceIds.includes(service.id)) {
      setNewPackage(prev => ({
        ...prev,
        serviceIds: [...prev.serviceIds, service.id]
      }));
    }
  };

  const handleRemoveService = (serviceId: string) => {
    setNewPackage(prev => ({
      ...prev,
      serviceIds: prev.serviceIds.filter(id => id !== serviceId)
    }));
  };

  const handleAddPackage = () => {
    if (!newPackage.name || newPackage.serviceIds.length === 0 || newPackage.price <= 0) {
      setMessage('Please fill all package details');
      setOpen(true);

      return;
    }

    setPackages([...packages, newPackage]);
    setNewPackage({ name: '', price: 0, serviceIds: [], notes: '' });
  };

  const removePackage = (index: number) => {
    const updatedPackages = [...packages];

    updatedPackages.splice(index, 1);
    setPackages(updatedPackages);
  };

  // File upload handlers
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>, documentType: string) => {
    try {
      const file = e.target.files?.[0];

      if (!file) return;

      // Preview for profile image
      if (documentType === 'image') {
        const previewUrl = URL.createObjectURL(file);

        setProfilePreview(previewUrl);
      }

      // Upload to Cloudinary
      const cloudinaryUrl = await uploadFile(file);
      
      // Update document URLs
      switch (documentType) {
      case 'image':
        setDocuments(prev => ({ ...prev, image: cloudinaryUrl }));
        break;
      case 'governmentId':
        setDocuments(prev => ({ ...prev, governmentIdDocumentUrl: cloudinaryUrl }));
        break;
      case 'policeCheck':
        setDocuments(prev => ({ ...prev, policeCheckDocumentUrl: cloudinaryUrl }));
        break;
      case 'firstAid':
        setDocuments(prev => ({ ...prev, firstAidCertificate: cloudinaryUrl }));
        break;
      }
      
      setMessage('Document uploaded successfully');
      setOpen(true);
    } catch  {
      setMessage('Failed to upload file');
      setOpen(true);
    }
  };

  // reCAPTCHA handler
  const handleCaptchaChange = async (token: string | null) => {
    if (!token) return;
    
    const isSuccessful = await verifyRecaptcha(token);

    setIsCaptchaVerified(isSuccessful);
  };

  // Form submission handler
  const handleSubmit = () => {
    if (!isCaptchaVerified) {
      setMessage('Please verify you are not a robot');
      setOpen(true);

      return;
    }

    if (!formData.agreeToTerms) {
      setMessage('Please agree to the terms and conditions');
      setOpen(true);

      return;
    }

    try {
      // Prepare services data
      const userServices = Object.values(selectedServices).map(service => ({
        serviceId: service.serviceId,
        price: service.price,
        notes: service.duration
      }));

      const registrationData: RegisterUserInput = {
        saveForFuture: false, 
        ...formData,
        proStatus: false, 
        phoneNumber: formData.phoneNumber.trim(),
        dateOfBirth: formData.dateOfBirth,
        hourlyRate: Math.max(...Object.values(selectedServices).map(s => s.price), 0),
        userServices: userServices,
        packages: packages.map(pkg => ({
          name: pkg.name,
          price: pkg.price,
          serviceIds: pkg.serviceIds,
          notes: pkg.notes || ''
        })),
        ...documents,
      };

      // Register user
      register(registrationData);
    } catch  {
      setMessage('Registration failed. Please try again.');
      setOpen(true);
    }
  };

  // Redirect to login on successful registration
  useEffect(() => {
    if (registrationState.isSuccess) {
      setMessage('Registration successful! Redirecting to login...');
      setOpen(true);
      
      // Redirect after delay
      setTimeout(() => {
        router.push('/en/login');
      }, 2000);
    } else if (registrationState.error) {
      setMessage(registrationState.error || 'Registration failed. Please try again.');
      setOpen(true);
    }
  }, [registrationState, router]);

  // Form validation
  const isFormValid = () => {
    if (currentStep === 1) {
      return (
        formData.firstName && 
        formData.lastName && 
        formData.username && 
        formData.username.length >= 3 &&
        (isUsernameAvailable === true) && // Username must be available
        formData.email &&
        formData.email.includes('@') &&
        (isEmailAvailable === true) && // Email must be available
        formData.password &&
        formData.password.length >= 6 &&
        formData.phoneNumber.length === 10 && // Validate phone has 10 characters
        formData.address &&
        formData.city &&
        formData.postalCode &&
        formData.country &&
        formData.dateOfBirth
      );
    }
    
    if (currentStep === 2) {
      // At least one service must be selected
      return Object.keys(selectedServices).length > 0;
    }
    
    return true;
  };

  // Step navigation
  const nextStep = () => {
    if (!isFormValid()) {
      setMessage('Please fill all required fields correctly!');
      setOpen(true);

      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Get service name by ID
  const getServiceName = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);

    return service ? service.name : 'Unknown service';
  };

  // Render steps
  const step1 = (
    <>
      <FormHeading>Personal Information</FormHeading>
      <FormDescription>
        Tell us about yourself so families can get to know you.
      </FormDescription>
      <ProfileBox>
        <ProfileWrapper>
          <ProfileImage
            src={profilePreview || '/registeration-mom/profile.svg'}
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
            onClick={() => document.getElementById('fileInput')?.click()}
          />
          <input
            type='file'
            id='fileInput'
            onChange={(e) => handleFileChange(e, 'image')}
            style={{ display: 'none' }}
            accept="image/*"
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          />
        </InputHolder>
        
        <InputHolder>
          <StyledInputLabel htmlFor='username'>Username</StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='text'
            id='username'
            name='username'
            value={formData.username}
            onChange={handleInputChange}
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
          <StyledInputLabel htmlFor='email'>Email</StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
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
        
        <InputHolder>
          <StyledInputLabel htmlFor='password'>Password</StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
          />
          {formData.password && formData.password.length < 6 && (
            <Typography color="error" variant="caption">
              Password must be at least 6 characters
            </Typography>
          )}
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor='phoneNumber'>Phone Number (10 digits)</StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='text'
            id='phoneNumber'
            name='phoneNumber'
            value={formData.phoneNumber}
            onChange={handleInputChange}
            inputProps={{ maxLength: 10 }}
            error={formData.phoneNumber.length > 0 && formData.phoneNumber.length !== 10}
          />
          {formData.phoneNumber.length > 0 && formData.phoneNumber.length !== 10 && (
            <Typography color="error" variant="caption">
              Phone number must be 10 digits
            </Typography>
          )}
        </InputHolder>

        <InputHolder>
          <StyledInputLabel htmlFor='dateOfBirth'>Date Of Birth</StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='date'
            id='dateOfBirth'
            name='dateOfBirth'
            value={formData.dateOfBirth}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
          onChange={handleInputChange}
        />
      </InputHolder>

      <InputHolder>
        <StyledInputLabel htmlFor='shortBio'>Short Bio</StyledInputLabel>
        <StyledInputField
          disableUnderline
          type='text'
          id='shortBio'
          name='shortBio'
          value={formData.shortBio}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={3}
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
          <Box sx={{display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderBottom: '1px solid #DFEAF2'}}>
            <StyledCheckBoxLabel sx={{marginLeft: '18px'}}>Services</StyledCheckBoxLabel>
            <Box sx={{display: 'flex', marginRight: '19px', gap: '20px'}}>
              <StyledCheckBoxLabel style={{width: '120px', textAlign: 'center'}}>Rate ($)</StyledCheckBoxLabel>
              <StyledCheckBoxLabel style={{width: '120px', textAlign: 'center'}}>Duration</StyledCheckBoxLabel>
            </Box>
          </Box>
          
          <Box sx={{padding: '18px 12px'}}>
            {servicesLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <CircularProgress size={30} />
              </Box>
            ) : services.length === 0 ? (
              <Box sx={{ p: 2, textAlign: 'center' }}>No services available</Box>
            ) : (
              services.map((service, index) => (
                <CheckBorderBox key={service.id} index={index}>
                  <CheckBoxContainer>
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon />}
                      checkedIcon={<CheckBoxIcon sx={{ color: '#005782' }} />}
                      checked={Boolean(selectedServices[service.id])}
                      onChange={(e) => handleServiceSelect(service.id, e.target.checked)}
                    />
                    <StyledCheckBoxLabel>{service.name}</StyledCheckBoxLabel>
                  </CheckBoxContainer>

                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '11px' }}>
                    <StyledInputFieldCheckBox
                      disableUnderline
                      type="number"
                      value={selectedServices[service.id]?.price || ''}
                      onChange={(e) => handleServicePriceChange(service.id, e.target.value)}
                      disabled={!selectedServices[service.id]}
                      placeholder="0.00"
                      inputProps={{ min: 0 }}
                    />
                    <CustomSelect
                      value={selectedServices[service.id]?.duration || '1 hr'}
                      onChange={(e) => handleServiceDurationChange(service.id, e.target.value as string)}
                      disabled={!selectedServices[service.id]}
                      sx={{ width: '120px' }}
                    >
                      <MenuItem value="30 min">30 min</MenuItem>
                      <MenuItem value="2 hrs">2 hrs</MenuItem>
                     
                    </CustomSelect>
                  </Box>
                </CheckBorderBox>
              ))
            )}
          </Box>
        </BorderBoxInternal>
      </BorderBox>

      {/* Improved Packages Section with single input */}
      <StyledInputLabel sx={{ mt: 4 }}>Custom Packages</StyledInputLabel>
      <BorderBox>
        <Box>
          <StyledInputLabel htmlFor="packageName">Package Name</StyledInputLabel>
          <StyledInputField
            disableUnderline
            type="text"
            id="packageName"
            value={newPackage.name}
            onChange={(e) => handlePackageNameChange(e.target.value)}
            placeholder="Weekend Special"
          />
          
          <StyledInputLabel>Select Services for Package</StyledInputLabel>
          <Autocomplete
            options={services.filter(service => !newPackage.serviceIds.includes(service.id))}
            getOptionLabel={(option) => option.name}
            onChange={(_, value) => handleAddService(value)}
            renderInput={(params) => (
              <TextField 
                {...params} 
                placeholder="Select services" 
                variant="outlined"
                sx={{ 
                  mb: 2,
                  '.MuiOutlinedInput-root': {
                    borderRadius: '15px',
                    paddingRight: '9px',
                    border: '1px solid #DFEAF2',
                    background: '#EAF9FF',
                  }
                }}
              />
            )}
          />
          
          {newPackage.serviceIds.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Selected Services:</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {newPackage.serviceIds.map(serviceId => (
                  <Chip
                    key={serviceId}
                    label={getServiceName(serviceId)}
                    onDelete={() => handleRemoveService(serviceId)}
                    deleteIcon={<HighlightOffIcon />}
                    sx={{ 
                      background: '#34BCFF33',
                      borderRadius: '15px',
                      color: '#005782',
                      fontWeight: 500
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}
          
          <GridBox>
            <InputHolder>
              <StyledInputLabel htmlFor="packagePrice">Package Price ($)</StyledInputLabel>
              <StyledInputField
                disableUnderline
                type="number"
                id="packagePrice"
                value={newPackage.price || ''}
                onChange={(e) => handlePackagePriceChange(e.target.value)}
                inputProps={{ min: 0 }}
              />
            </InputHolder>
            
            <InputHolder>
              <StyledInputLabel htmlFor="packageNotes">Notes (optional)</StyledInputLabel>
              <StyledInputField
                disableUnderline
                type="text"
                id="packageNotes"
                value={newPackage.notes || ''}
                onChange={(e) => handlePackageNotesChange(e.target.value)}
                placeholder="Additional details about this package"
              />
            </InputHolder>
          </GridBox>
          
          <Button width='100%' style={{marginTop: '16px'}} onClick={handleAddPackage}>
            Add Package
          </Button>
        </Box>
        
        {packages.length > 0 && (
          <Box mt={3}>
            <StyledInputLabel>Your Packages</StyledInputLabel>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <CustomTableCell>Package Name</CustomTableCell>
                    <CustomTableCell>Included Services</CustomTableCell>
                    <CustomTableCell>Price ($)</CustomTableCell>
                    <CustomTableCell>Actions</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {packages.map((pkg, index) => (
                    <TableRow key={index}>
                      <TableCell>{pkg.name}</TableCell>
                      <TableCell>
                        {pkg.serviceIds.map(id => getServiceName(id)).join(', ')}
                      </TableCell>
                      <TableCell>{pkg.price}</TableCell>
                      <TableCell>
                        <Button 
                          width="auto" 
                          onClick={() => removePackage(index)}
                          sx={{ minWidth: 'auto', py: 1 }}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </BorderBox>
      
      <CertificateBoxWrapper>
        <CertificateStyledInputLabel>
          Government Issued ID
        </CertificateStyledInputLabel>
        <CertificateUploadBox 
          onClick={() => document.getElementById('govIdInput')?.click()}
          style={{ cursor: 'pointer' }}
        >
          <Image
            src='/registeration-mom/upload.svg'
            height={20}
            width={20}
            alt='Upload Icon'
          />
          <StyledCheckBoxLabel>
            {documents.governmentIdDocumentUrl ? 'Document Uploaded ✓' : 'Upload Document'}
          </StyledCheckBoxLabel>
          <input
            type='file'
            id='govIdInput'
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(e, 'governmentId')}
            accept="image/*,application/pdf"
          />
        </CertificateUploadBox>
      </CertificateBoxWrapper>
      
      <CertificateBoxWrapper>
        <CertificateStyledInputLabel>
          Police Vulnerable Sector Check
        </CertificateStyledInputLabel>
        <CertificateUploadBox
          onClick={() => document.getElementById('policeCheckInput')?.click()}
          style={{ cursor: 'pointer' }}
        >
          <Image
            src='/registeration-mom/upload.svg'
            height={20}
            width={20}
            alt='Upload Icon'
          />
          <StyledCheckBoxLabel>
            {documents.policeCheckDocumentUrl ? 'Document Uploaded ✓' : 'Upload Certificate'}
          </StyledCheckBoxLabel>
          <input
            type='file'
            id='policeCheckInput'
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(e, 'policeCheck')}
            accept="image/*,application/pdf"
          />
        </CertificateUploadBox>
      </CertificateBoxWrapper>
      
      <CertificateBoxWrapper>
        <CertificateStyledInputLabel>
          First Aid Certification
        </CertificateStyledInputLabel>
        <CertificateUploadBox
          onClick={() => document.getElementById('firstAidInput')?.click()}
          style={{ cursor: 'pointer' }}
        >
          <Image
            src='/registeration-mom/upload.svg'
            height={20}
            width={20}
            alt='Upload Icon'
          />
          <StyledCheckBoxLabel>
            {documents.firstAidCertificate ? 'Document Uploaded ✓' : 'Upload Certificate'}
          </StyledCheckBoxLabel>
          <input
            type='file'
            id='firstAidInput'
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(e, 'firstAid')}
            accept="image/*,application/pdf"
          />
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
        <StyledSelect 
          value={formData.paymentMethod}
          onChange={(e) => setFormData({...formData, paymentMethod: e.target.value as 'E_TRANSFER' | 'DIRECT_DEPOSIT'})}
          fullWidth
        >
          <MenuItem value="E_TRANSFER">E-Transfer</MenuItem>
          <MenuItem value="DIRECT_DEPOSIT">Direct Deposit</MenuItem>
        </StyledSelect>
      </InputHolder>
      
      <InputHolder>
        <StyledInputLabel htmlFor='eTransferEmail'>
          Email for a e-Transfer
        </StyledInputLabel>
        <CardCaption>Payments will be sent to this email address.</CardCaption>
        <StyledInputField
          disableUnderline
          type='email'
          id='eTransferEmail'
          name='eTransferEmail'
          value={formData.eTransferEmail}
          onChange={handleInputChange}
        />
      </InputHolder>

      <StyledInputLabel>Direct Deposit Information (Optional)</StyledInputLabel>
      <OptionalGridBox>
        <InputHolder>
          <StyledInputLabel htmlFor='bankTransitNumber'>
            Transit Number
          </StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='text'
            id='bankTransitNumber'
            name='bankTransitNumber'
            value={formData.bankTransitNumber}
            onChange={handleInputChange}
          />
        </InputHolder>
        
        <InputHolder>
          <StyledInputLabel htmlFor='bankInstitutionNumber'>
            Institution Number
          </StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='text'
            id='bankInstitutionNumber'
            name='bankInstitutionNumber'
            value={formData.bankInstitutionNumber}
            onChange={handleInputChange}
          />
        </InputHolder>
        
        <InputHolder>
          <StyledInputLabel htmlFor='bankAccountNumber'>
            Account Number
          </StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='text'
            id='bankAccountNumber'
            name='bankAccountNumber'
            value={formData.bankAccountNumber}
            onChange={handleInputChange}
          />
        </InputHolder>
      </OptionalGridBox>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <CheckFlex>
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon />}
            checkedIcon={<CheckBoxIcon />}
            checked={formData.agreeToTerms}
            onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
          />
          <CheckBoxTypography sx={{display: 'flex'}}>
            I agree to the
            <Typography onClick={handleTerms}>&nbsp;Terms of Service</Typography>&nbsp; and
            <Typography onClick={handlePrivacy}>&nbsp;Privacy Policy</Typography>
          </CheckBoxTypography>
        </CheckFlex>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Replace with your actual site key in production
            onChange={handleCaptchaChange}
          />
        </Box>
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
      >
        <Alert
          severity={message.includes('success') ? 'success' : 'error'}
          variant='filled'
          sx={{
            width: '100%',
            fontSize: '16px',
            padding: '15px',
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
          
          {currentStep < 3 ? (
            <Button
              special
              onClick={nextStep}
              padding='18px 90px'
              fontSize='18px'
              borderRadius='15px'
              height='64px'
              disabled={!isFormValid()}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!formData.agreeToTerms || !isCaptchaVerified || registrationState.isLoading}
              padding='18px 90px'
              fontSize='18px'
              height='64px'
              borderRadius='15px'
              special
            >
              {registrationState.isLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CircularProgress size={24} sx={{ color: 'white', mr: 1 }} />
                  Submitting...
                </Box>
              ) : (
                'Submit'
              )}
            </Button>
          )}
        </ButtonContainer>
        
        <ApplicationSatus />
      </FormContainer>
    </>
  );
}