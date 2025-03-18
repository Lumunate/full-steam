"use client";

import { 
  Alert, 
  Box, 
  Button, 
  Checkbox, 
  CircularProgress, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  FormControlLabel, 
  IconButton, 
  Paper, 
  Tab, 
  Tabs, 
  TextField, 
  Typography 
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon, CreditCard as CreditCardIcon } from "@mui/icons-material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Navbar from "@/components/layout/Navbar";

// Password change schema
const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Confirm password is required"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Profile update schema
const profileUpdateSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  additionalInfo: z.string().optional(),
});

// Services update schema
const servicesUpdateSchema = z.object({
  childcare: z.boolean().default(false),
  mealPreparation: z.boolean().default(false),
  lightHousekeeping: z.boolean().default(false),
  tutoring: z.boolean().default(false),
  petMinding: z.boolean().default(false),
});

// Child update schema
const childUpdateSchema = z.object({
  id: z.string().min(1, "Child ID is required"),
  firstName: z.string().min(1, "Child's first name is required"),
  lastName: z.string().min(1, "Child's last name is required"),
  age: z.number().int().positive("Age must be a positive number"),
  specialNotes: z.string().optional(),
});

// Payment update schema
const paymentUpdateSchema = z.object({
  nameOnCard: z.string().min(1, "Name on card is required"),
  cardNumber: z.string().regex(/^[0-9]{16}$/, "Card number must be 16 digits"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, "Expiry date must be in MM/YY format"),
  cvv: z.string().regex(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits"),
  saveCard: z.boolean().default(false),
});

// Type definitions
type PasswordFormData = z.infer<typeof passwordSchema>;
type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;
type ServicesUpdateFormData = z.infer<typeof servicesUpdateSchema>;
type ChildUpdateFormData = z.infer<typeof childUpdateSchema>;
type PaymentUpdateFormData = z.infer<typeof paymentUpdateSchema>;

type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  additionalInfo?: string;
  children: Array<{
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    specialNotes?: string;
  }>;
  services: {
    childcare: boolean;
    mealPreparation: boolean;
    lightHousekeeping: boolean;
    tutoring: boolean;
    petMinding: boolean;
  };
  paymentInfo?: {
    id: string;
    nameOnCard: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    saveCard: boolean;
  };
  updateRequests: Array<{
    id: string;
    requestType: string;
    status: string;
    createdAt: string;
  }>;
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);
  
  // Password change states
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  
  // Profile update states
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [profileUpdateLoading, setProfileUpdateLoading] = useState(false);
  const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);
  
  // Services update states
  const [showServicesDialog, setShowServicesDialog] = useState(false);
  const [servicesUpdateLoading, setServicesUpdateLoading] = useState(false);
  const [servicesUpdateSuccess, setServicesUpdateSuccess] = useState(false);
  
  // Child update states
  const [showChildDialog, setShowChildDialog] = useState(false);
  const [childUpdateLoading, setChildUpdateLoading] = useState(false);
  const [childUpdateSuccess, setChildUpdateSuccess] = useState(false);
  
  // Create add child form
  const [showAddChildDialog, setShowAddChildDialog] = useState(false);
  const [addChildLoading, setAddChildLoading] = useState(false);
  const [addChildSuccess, setAddChildSuccess] = useState(false);

  // Payment update states
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentUpdateLoading, setPaymentUpdateLoading] = useState(false);
  const [paymentUpdateSuccess, setPaymentUpdateSuccess] = useState(false);

  // Form handlers
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    setValue: setProfileValue,
    formState: { errors: profileErrors },
  } = useForm<ProfileUpdateFormData>({
    resolver: zodResolver(profileUpdateSchema),
  });

  const {
    register: registerServices,
    handleSubmit: handleSubmitServices,
    setValue: setServicesValue,
    formState: { errors: servicesErrors },
    watch: watchServices,
  } = useForm<ServicesUpdateFormData>({
    resolver: zodResolver(servicesUpdateSchema),
    defaultValues: {
      childcare: false,
      mealPreparation: false,
      lightHousekeeping: false,
      tutoring: false,
      petMinding: false
    }
  });

  const {
    register: registerChild,
    handleSubmit: handleSubmitChild,
    setValue: setChildValue,
    formState: { errors: childErrors },
  } = useForm<ChildUpdateFormData>({
    resolver: zodResolver(childUpdateSchema),
  });

  const {
    register: registerAddChild,
    handleSubmit: handleSubmitAddChild,
    reset: resetAddChild,
    formState: { errors: addChildErrors },
  } = useForm<ChildUpdateFormData>({
    resolver: zodResolver(childUpdateSchema),
    defaultValues: {
      id: '',
      firstName: "",
      lastName: "",
      age: 0,
      specialNotes: ""
    }
  });

  const {
    register: registerPayment,
    handleSubmit: handleSubmitPayment,
    setValue: setPaymentValue,
    formState: { errors: paymentErrors },
  } = useForm<PaymentUpdateFormData>({
    resolver: zodResolver(paymentUpdateSchema),
  });

  // Watch services values for controlled checkboxes
  const servicesValues = watchServices();

  // Tab change handler
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/user/profile");
        console.log("User profile data:", response.data);
        setUserProfile(response.data);
      } catch (error) {
        console.error("Failed to load profile:", error);
        setProfileError("Failed to load your profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchUserProfile();
    }
  }, [status]);

  // Password change handler
  const onSubmitPassword = async (data: PasswordFormData) => {
    try {
      setPasswordError(null);
      setPasswordSuccess(false);
      setPasswordLoading(true);
      
      await axios.post("/api/user/change-password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      
      setPasswordSuccess(true);
      resetPassword();
    } catch (error: any) {
      setPasswordError(error.response?.data?.message || "Failed to change password. Please try again.");
    } finally {
      setPasswordLoading(false);
    }
  };

  // Open profile dialog and initialize form
  const openProfileDialog = () => {
    if (userProfile) {
      // Explicitly set all form values properly
      setProfileValue("firstName", userProfile.firstName || "");
      setProfileValue("lastName", userProfile.lastName || "");
      setProfileValue("phone", userProfile.phone || "");
      setProfileValue("address", userProfile.address || "");
      setProfileValue("city", userProfile.city || "");
      setProfileValue("postalCode", userProfile.postalCode || "");
      setProfileValue("additionalInfo", userProfile.additionalInfo || "");
      
      console.log("Opening profile dialog with data:", {
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        additionalInfo: userProfile.additionalInfo || ""
      });
      
      setShowProfileDialog(true);
    }
  };

  // Profile update handler
  const onSubmitProfileUpdate = async (data: ProfileUpdateFormData) => {
    try {
      setProfileUpdateLoading(true);
      
      // Directly update the profile without admin approval
      await axios.post("/api/user/update-profile-direct", data);
      
      setProfileUpdateSuccess(true);
      setTimeout(() => {
        setShowProfileDialog(false);
        setProfileUpdateSuccess(false);
        // Refresh user profile after update
        axios.get("/api/user/profile").then(response => {
          setUserProfile(response.data);
        });
      }, 2000);
    } catch (error: any) {
      setProfileError(error.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setProfileUpdateLoading(false);
    }
  };

  // Open services dialog and initialize form
  const openServicesDialog = () => {
    if (userProfile && userProfile.services) {
      console.log("Opening services dialog with data:", userProfile.services);
      
      // Set form values for services
      setServicesValue("childcare", userProfile.services.childcare);
      setServicesValue("mealPreparation", userProfile.services.mealPreparation);
      setServicesValue("lightHousekeeping", userProfile.services.lightHousekeeping);
      setServicesValue("tutoring", userProfile.services.tutoring);
      setServicesValue("petMinding", userProfile.services.petMinding);
      
      setShowServicesDialog(true);
    }
  };

  // Services update handler
  const onSubmitServicesUpdate = async (data: ServicesUpdateFormData) => {
    try {
      setServicesUpdateLoading(true);
      
      // Directly update services without admin approval
      await axios.post("/api/user/update-services-direct", data);
      
      setServicesUpdateSuccess(true);
      setTimeout(() => {
        setShowServicesDialog(false);
        setServicesUpdateSuccess(false);
        // Refresh user profile after update
        axios.get("/api/user/profile").then(response => {
          setUserProfile(response.data);
        });
      }, 2000);
    } catch (error: any) {
      setProfileError(error.response?.data?.message || "Failed to update services. Please try again.");
    } finally {
      setServicesUpdateLoading(false);
    }
  };

  // Open child edit dialog and initialize form
  const openChildDialog = (child: UserProfile['children'][0]) => {
    if (child) {
      console.log("Opening child dialog with data:", child);
      
      // Explicitly set all form values
      setChildValue("id", child.id);
      setChildValue("firstName", child.firstName || "");
      setChildValue("lastName", child.lastName || "");
      setChildValue("age", child.age || 0);
      setChildValue("specialNotes", child.specialNotes || "");
      
      setShowChildDialog(true);
    }
  };

  // Child update handler
  const onSubmitChildUpdate = async (data: ChildUpdateFormData) => {
    try {
      setChildUpdateLoading(true);
      console.log("Submitting child update with data:", data);
      
      // Directly update child without admin approval
      const response = await axios.post("/api/user/update-child-direct", data);
      console.log("Child update response:", response.data);
      
      setChildUpdateSuccess(true);
      setTimeout(() => {
        setShowChildDialog(false);
        setChildUpdateSuccess(false);
        // Refresh user profile after update
        axios.get("/api/user/profile").then(response => {
          setUserProfile(response.data);
        });
      }, 2000);
    } catch (error: any) {
      console.error("Child update error:", error);
      setProfileError(error.response?.data?.message || "Failed to update child. Please try again.");
    } finally {
      setChildUpdateLoading(false);
    }
  };

  // Add child handler
  const onSubmitAddChild = async (data: ChildUpdateFormData) => {
    try {
      setAddChildLoading(true);
      
      // Directly add child without admin approval
      await axios.post("/api/user/add-child-direct", data);
      
      setAddChildSuccess(true);
      setTimeout(() => {
        setShowAddChildDialog(false);
        setAddChildSuccess(false);
        resetAddChild();
        // Refresh user profile after update
        axios.get("/api/user/profile").then(response => {
          setUserProfile(response.data);
        });
      }, 2000);
    } catch (error: any) {
      setProfileError(error.response?.data?.message || "Failed to add child. Please try again.");
    } finally {
      setAddChildLoading(false);
    }
  };

  // Open payment dialog and initialize form
  const openPaymentDialog = () => {
    if (userProfile && userProfile.paymentInfo) {
      console.log("Opening payment dialog with data:", userProfile.paymentInfo);
      
      // Explicitly set all form values
      setPaymentValue("nameOnCard", userProfile.paymentInfo.nameOnCard || "");
      setPaymentValue("cardNumber", userProfile.paymentInfo.cardNumber || "");
      setPaymentValue("expiryDate", userProfile.paymentInfo.expiryDate || "");
      setPaymentValue("cvv", userProfile.paymentInfo.cvv || "");
      setPaymentValue("saveCard", userProfile.paymentInfo.saveCard || false);
      
      setShowPaymentDialog(true);
    } else {
      // If no payment info, initialize with empty values
      setPaymentValue("nameOnCard", "");
      setPaymentValue("cardNumber", "");
      setPaymentValue("expiryDate", "");
      setPaymentValue("cvv", "");
      setPaymentValue("saveCard", false);
      
      setShowPaymentDialog(true);
    }
  };

  // Payment update handler
  const onSubmitPaymentUpdate = async (data: PaymentUpdateFormData) => {
    try {
      setPaymentUpdateLoading(true);
      
      // Directly update payment without admin approval
      await axios.post("/api/user/update-payment-direct", data);
      
      setPaymentUpdateSuccess(true);
      setTimeout(() => {
        setShowPaymentDialog(false);
        setPaymentUpdateSuccess(false);
        // Refresh user profile after update
        axios.get("/api/user/profile").then(response => {
          setUserProfile(response.data);
        });
      }, 2000);
    } catch (error: any) {
      setProfileError(error.response?.data?.message || "Failed to update payment information. Please try again.");
    } finally {
      setPaymentUpdateLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <Paper className="p-6 mb-6">
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome, {userProfile?.firstName}!
          </Typography>
          
          {profileError && (
            <Alert severity="error" className="mb-4" onClose={() => setProfileError(null)}>
              {profileError}
            </Alert>
          )}

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="dashboard tabs">
              <Tab label="Profile" />
              <Tab label="Services" />
              <Tab label="Children" />
              <Tab label="Payment" />
              <Tab label="Security" />
            </Tabs>
          </Box>

          {/* Profile Tab */}
          {tabValue === 0 && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h6" component="h2">
                  Personal Information
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={openProfileDialog}
                >
                  Edit Profile
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Typography variant="subtitle1" fontWeight="bold">Name:</Typography>
                  <Typography>{userProfile?.firstName} {userProfile?.lastName}</Typography>
                </div>
                <div>
                  <Typography variant="subtitle1" fontWeight="bold">Email:</Typography>
                  <Typography>{userProfile?.email}</Typography>
                </div>
                <div>
                  <Typography variant="subtitle1" fontWeight="bold">Phone:</Typography>
                  <Typography>{userProfile?.phone}</Typography>
                </div>
                <div>
                  <Typography variant="subtitle1" fontWeight="bold">Address:</Typography>
                  <Typography>{userProfile?.address}, {userProfile?.city}, {userProfile?.postalCode}</Typography>
                </div>
                {userProfile?.additionalInfo && (
                  <div className="md:col-span-2">
                    <Typography variant="subtitle1" fontWeight="bold">Additional Information:</Typography>
                    <Typography>{userProfile.additionalInfo}</Typography>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Services Tab */}
          {tabValue === 1 && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h6" component="h2">
                  Services Selected
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={openServicesDialog}
                >
                  Update Services
                </Button>
              </div>
              
              <ul className="space-y-2">
                <li>
                  <Typography>
                    {userProfile?.services.childcare ? "✅ Childcare" : "❌ Childcare"}
                  </Typography>
                </li>
                <li>
                  <Typography>
                    {userProfile?.services.mealPreparation ? "✅ Meal Preparation" : "❌ Meal Preparation"}
                  </Typography>
                </li>
                <li>
                  <Typography>
                    {userProfile?.services.lightHousekeeping ? "✅ Light Housekeeping" : "❌ Light Housekeeping"}
                  </Typography>
                </li>
                <li>
                  <Typography>
                    {userProfile?.services.tutoring ? "✅ Tutoring" : "❌ Tutoring"}
                  </Typography>
                </li>
                <li>
                  <Typography>
                    {userProfile?.services.petMinding ? "✅ Pet Minding" : "❌ Pet Minding"}
                  </Typography>
                </li>
              </ul>
            </div>
          )}

          {/* Children Tab */}
          {tabValue === 2 && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h6" component="h2">
                  Children
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => setShowAddChildDialog(true)}
                >
                  Add Child
                </Button>
              </div>
              
              {!userProfile?.children || userProfile.children.length === 0 ? (
                <Typography>No children found.</Typography>
              ) : (
                <div className="space-y-4">
                  {userProfile.children.map((child) => (
                    <Paper key={child.id} className="p-4 border rounded-md relative">
                      <IconButton 
                        className="absolute top-2 right-2"
                        color="primary"
                        onClick={() => openChildDialog(child)}
                      >
                        <EditIcon />
                      </IconButton>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                          <Typography variant="subtitle1" fontWeight="bold">Name:</Typography>
                          <Typography>{child.firstName} {child.lastName}</Typography>
                        </div>
                        <div>
                          <Typography variant="subtitle1" fontWeight="bold">Age:</Typography>
                          <Typography>{child.age}</Typography>
                        </div>
                        {child.specialNotes && (
                          <div className="md:col-span-2">
                            <Typography variant="subtitle1" fontWeight="bold">Special Notes:</Typography>
                            <Typography>{child.specialNotes}</Typography>
                          </div>
                        )}
                      </div>
                    </Paper>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Payment Tab */}
          {tabValue === 3 && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h6" component="h2">
                  Payment Information
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<CreditCardIcon />}
                  onClick={openPaymentDialog}
                >
                  {userProfile?.paymentInfo ? "Update Payment" : "Add Payment"}
                </Button>
              </div>
              
              {userProfile?.paymentInfo ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Typography variant="subtitle1" fontWeight="bold">Name on Card:</Typography>
                    <Typography>{userProfile.paymentInfo.nameOnCard}</Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle1" fontWeight="bold">Card Number:</Typography>
                    <Typography>
                      ••••••••••••{userProfile.paymentInfo.cardNumber.slice(-4)}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle1" fontWeight="bold">Expiry Date:</Typography>
                    <Typography>{userProfile.paymentInfo.expiryDate}</Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle1" fontWeight="bold">Save for Future Bookings:</Typography>
                    <Typography>{userProfile.paymentInfo.saveCard ? "Yes" : "No"}</Typography>
                  </div>
                </div>
              ) : (
                <Typography>No payment information found. Click "Add Payment" to add your payment details.</Typography>
              )}
            </div>
          )}

          {/* Security Tab */}
          {tabValue === 4 && (
            <div>
              <Typography variant="h6" component="h2" gutterBottom>
                Change Password
              </Typography>
              
              {passwordError && (
                <Alert severity="error" className="mb-4">
                  {passwordError}
                </Alert>
              )}
              
              {passwordSuccess && (
                <Alert severity="success" className="mb-4">
                  Password changed successfully!
                </Alert>
              )}
              
              <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-4 max-w-md">
                <div>
                  <TextField
                    type="password"
                    label="Current Password"
                    {...registerPassword("currentPassword")}
                    error={!!passwordErrors.currentPassword}
                    helperText={passwordErrors.currentPassword?.message}
                    fullWidth
                  />
                </div>
                
                <div>
                  <TextField
                    type="password"
                    label="New Password"
                    {...registerPassword("newPassword")}
                    error={!!passwordErrors.newPassword}
                    helperText={passwordErrors.newPassword?.message}
                    fullWidth
                  />
                </div>
                
                <div>
                  <TextField
                    type="password"
                    label="Confirm New Password"
                    {...registerPassword("confirmPassword")}
                    error={!!passwordErrors.confirmPassword}
                    helperText={passwordErrors.confirmPassword?.message}
                    fullWidth
                  />
                </div>
                
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={passwordLoading}
                  startIcon={passwordLoading ? <CircularProgress size={20} /> : null}
                >
                  {passwordLoading ? "Changing..." : "Change Password"}
                </Button>
              </form>
            </div>
          )}
        </Paper>

        {/* Edit Profile Dialog */}
        <Dialog open={showProfileDialog} onClose={() => setShowProfileDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit Profile</DialogTitle>
          <form onSubmit={handleSubmitProfile(onSubmitProfileUpdate)}>
            <DialogContent>
              {profileUpdateSuccess && (
                <Alert severity="success" className="mb-4">
                  Profile updated successfully!
                </Alert>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <TextField
                  label="First Name"
                  {...registerProfile("firstName")}
                  error={!!profileErrors.firstName}
                  helperText={profileErrors.firstName?.message}
                  fullWidth
                />
                
                <TextField
                  label="Last Name"
                  {...registerProfile("lastName")}
                  error={!!profileErrors.lastName}
                  helperText={profileErrors.lastName?.message}
                  fullWidth
                />
              </div>
              
              <TextField
                label="Phone"
                {...registerProfile("phone")}
                error={!!profileErrors.phone}
                helperText={profileErrors.phone?.message}
                fullWidth
                className="mb-4"
              />
              
              <TextField
                label="Address"
                {...registerProfile("address")}
                error={!!profileErrors.address}
                helperText={profileErrors.address?.message}
                fullWidth
                className="mb-4"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <TextField
                  label="City"
                  {...registerProfile("city")}
                  error={!!profileErrors.city}
                  helperText={profileErrors.city?.message}
                  fullWidth
                />
                
                <TextField
                  label="Postal Code"
                  {...registerProfile("postalCode")}
                  error={!!profileErrors.postalCode}
                  helperText={profileErrors.postalCode?.message}
                  fullWidth
                />
              </div>
              
              <TextField
                label="Additional Information"
                {...registerProfile("additionalInfo")}
                error={!!profileErrors.additionalInfo}
                helperText={profileErrors.additionalInfo?.message}
                multiline
                rows={4}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowProfileDialog(false)}>Cancel</Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={profileUpdateLoading}
                startIcon={profileUpdateLoading ? <CircularProgress size={20} /> : null}
              >
                {profileUpdateLoading ? "Updating..." : "Update Profile"}
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* Edit Services Dialog */}
        <Dialog open={showServicesDialog} onClose={() => setShowServicesDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Update Services</DialogTitle>
          <form onSubmit={handleSubmitServices(onSubmitServicesUpdate)}>
            <DialogContent>
              {servicesUpdateSuccess && (
                <Alert severity="success" className="mb-4">
                  Services updated successfully!
                </Alert>
              )}
              
              <Typography variant="body1" gutterBottom>
                Please select the services you need:
              </Typography>
              
              <div className="space-y-2">
                <FormControlLabel
                  control={
                    <Checkbox 
                      {...registerServices("childcare")}
                      checked={servicesValues.childcare} 
                    />
                  }
                  label="Childcare"
                />
                
                <FormControlLabel
                  control={
                    <Checkbox 
                      {...registerServices("mealPreparation")}
                      checked={servicesValues.mealPreparation}
                    />
                  }
                  label="Meal Preparation"
                />
                
                <FormControlLabel
                  control={
                    <Checkbox 
                      {...registerServices("lightHousekeeping")}
                      checked={servicesValues.lightHousekeeping}
                    />
                  }
                  label="Light Housekeeping"
                />
                
                <FormControlLabel
                  control={
                    <Checkbox 
                      {...registerServices("tutoring")}
                      checked={servicesValues.tutoring}
                    />
                  }
                  label="Tutoring"
                />
                
                <FormControlLabel
                  control={
                    <Checkbox 
                      {...registerServices("petMinding")}
                      checked={servicesValues.petMinding}
                    />
                  }
                  label="Pet Minding"
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowServicesDialog(false)}>Cancel</Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={servicesUpdateLoading}
                startIcon={servicesUpdateLoading ? <CircularProgress size={20} /> : null}
              >
                {servicesUpdateLoading ? "Updating..." : "Update Services"}
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* Edit Child Dialog */}
        <Dialog open={showChildDialog} onClose={() => setShowChildDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Update Child Information</DialogTitle>
          <form onSubmit={handleSubmitChild(onSubmitChildUpdate)}>
            <DialogContent>
              {childUpdateSuccess && (
                <Alert severity="success" className="mb-4">
                  Child information updated successfully!
                </Alert>
              )}
              
              <input type="hidden" {...registerChild("id")} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <TextField
                  label="First Name"
                  {...registerChild("firstName")}
                  error={!!childErrors.firstName}
                  helperText={childErrors.firstName?.message}
                  fullWidth
                />
                
                <TextField
                  label="Last Name"
                  {...registerChild("lastName")}
                  error={!!childErrors.lastName}
                  helperText={childErrors.lastName?.message}
                  fullWidth
                />
              </div>
              
              <TextField
                label="Age"
                type="number"
                {...registerChild("age")}
                error={!!childErrors.age}
                helperText={childErrors.age?.message}
                fullWidth
                className="mb-4"
              />
              
              <TextField
                label="Special Notes"
                {...registerChild("specialNotes")}
                error={!!childErrors.specialNotes}
                helperText={childErrors.specialNotes?.message}
                multiline
                rows={4}
                placeholder="Allergies, medical conditions, special needs, or any other important information"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowChildDialog(false)}>Cancel</Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={childUpdateLoading}
                startIcon={childUpdateLoading ? <CircularProgress size={20} /> : null}
              >
                {childUpdateLoading ? "Updating..." : "Update Child"}
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* Add Child Dialog */}
        <Dialog open={showAddChildDialog} onClose={() => setShowAddChildDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Child</DialogTitle>
          <form onSubmit={handleSubmitAddChild(onSubmitAddChild)}>
            <DialogContent>
              {addChildSuccess && (
                <Alert severity="success" className="mb-4">
                  Child added successfully!
                </Alert>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <TextField
                  label="First Name"
                  {...registerAddChild("firstName")}
                  error={!!addChildErrors.firstName}
                  helperText={addChildErrors.firstName?.message}
                  fullWidth
                />
                
                <TextField
                  label="Last Name"
                  {...registerAddChild("lastName")}
                  error={!!addChildErrors.lastName}
                  helperText={addChildErrors.lastName?.message}
                  fullWidth
                />
              </div>
              
              <TextField
                label="Age"
                type="number"
                {...registerAddChild("age")}
                error={!!addChildErrors.age}
                helperText={addChildErrors.age?.message}
                fullWidth
                className="mb-4"
              />
              
              <TextField
                label="Special Notes"
                {...registerAddChild("specialNotes")}
                error={!!addChildErrors.specialNotes}
                helperText={addChildErrors.specialNotes?.message}
                multiline
                rows={4}
                placeholder="Allergies, medical conditions, special needs, or any other important information"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowAddChildDialog(false)}>Cancel</Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={addChildLoading}
                startIcon={addChildLoading ? <CircularProgress size={20} /> : null}
              >
                {addChildLoading ? "Adding..." : "Add Child"}
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* Edit Payment Dialog */}
        <Dialog open={showPaymentDialog} onClose={() => setShowPaymentDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Update Payment Information</DialogTitle>
          <form onSubmit={handleSubmitPayment(onSubmitPaymentUpdate)}>
            <DialogContent>
              {paymentUpdateSuccess && (
                <Alert severity="success" className="mb-4">
                  Payment information updated successfully!
                </Alert>
              )}
              
              <div className="grid grid-cols-1 gap-4 mb-4">
                <TextField
                  label="Name on Card"
                  {...registerPayment("nameOnCard")}
                  error={!!paymentErrors.nameOnCard}
                  helperText={paymentErrors.nameOnCard?.message}
                  fullWidth
                />
                
                <TextField
                  label="Card Number"
                  {...registerPayment("cardNumber")}
                  error={!!paymentErrors.cardNumber}
                  helperText={paymentErrors.cardNumber?.message}
                  fullWidth
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <TextField
                    label="Expiry Date (MM/YY)"
                    {...registerPayment("expiryDate")}
                    error={!!paymentErrors.expiryDate}
                    helperText={paymentErrors.expiryDate?.message}
                    fullWidth
                  />
                  
                  <TextField
                    label="CVV"
                    type="password"
                    {...registerPayment("cvv")}
                    error={!!paymentErrors.cvv}
                    helperText={paymentErrors.cvv?.message}
                    fullWidth
                  />
                </div>
                
                <FormControlLabel
                  control={
                    <Checkbox 
                      {...registerPayment("saveCard")}
                    />
                  }
                  label="Save this card for future bookings"
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowPaymentDialog(false)}>Cancel</Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={paymentUpdateLoading}
                startIcon={paymentUpdateLoading ? <CircularProgress size={20} /> : null}
              >
                {paymentUpdateLoading ? "Updating..." : "Update Payment Info"}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </main>
    </div>
  );
}