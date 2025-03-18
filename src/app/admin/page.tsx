"use client";

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
  Box,
  Alert,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Collapse,
} from "@mui/material";
import { 
  Visibility as VisibilityIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  additionalInfo?: string;
  isApproved: boolean;
  isActive: boolean;
  createdAt: string;
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
};

type UserDetail = User;

type UpdateRequest = {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  requestType: string;
  requestData: any;
  status: string;
  createdAt: string;
};

// Account status filter options
type AccountStatus = "ALL" | "ACTIVE" | "PENDING" | "INACTIVE";

// Component for displaying collapsible row details
// Replace the UserRow component in your admin panel

// Component for displaying collapsible row details
function UserRow(props: { 
  user: User; 
  toggleApprovalStatus: (userId: string, currentStatus: boolean) => void; 
  toggleActiveStatus: (userId: string, currentStatus: boolean) => void;
  viewUserDetails: (userId: string) => void; 
  approveLoading: string | null;
  toggleStatusLoading: string | null;
}) {
  const { user, toggleApprovalStatus, toggleActiveStatus, viewUserDetails, approveLoading, toggleStatusLoading } = props;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.phone}</TableCell>
        <TableCell>
          {new Date(user.createdAt).toLocaleDateString()}
        </TableCell>
        <TableCell>
          {!user.isApproved ? (
            <Chip label="Pending" color="warning" />
          ) : user.isActive ? (
            <Chip label="Active" color="success" />
          ) : (
            <Chip label="Inactive" color="error" />
          )}
        </TableCell>
        <TableCell>
          <div className="flex space-x-2">
            <Button
              variant="outlined"
              size="small"
              startIcon={<VisibilityIcon />}
              onClick={() => viewUserDetails(user.id)}
            >
              View
            </Button>
            
            <Button
              variant={user.isApproved ? "outlined" : "contained"} 
              color={user.isApproved ? "error" : "success"}
              size="small"
              onClick={() => toggleApprovalStatus(user.id, user.isApproved)}
              disabled={approveLoading === user.id}
              startIcon={approveLoading === user.id ? <CircularProgress size={20} /> : null}
            >
              {approveLoading === user.id ? "Processing..." : user.isApproved ? "block" : "Approve"}
            </Button>
            
            {/* {user.isApproved && (
              <Button
                variant={user.isActive ? "outlined" : "contained"}
                color={user.isActive ? "error" : "success"}
                size="small"
                onClick={() => toggleActiveStatus(user.id, user.isActive)}
                disabled={toggleStatusLoading === user.id}
                startIcon={
                  toggleStatusLoading === user.id ? (
                    <CircularProgress size={20} />
                  ) : user.isActive ? (
                    <BlockIcon />
                  ) : (
                    <CheckCircleIcon />
                  )
                }
              >
                {toggleStatusLoading === user.id ? "Processing..." : user.isActive ? "Deactivate" : "Activate"}
              </Button>
            )} */}
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detailed Information
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Typography variant="subtitle1" fontWeight="bold">Address:</Typography>
                  <Typography>{user.address}, {user.city}, {user.postalCode}</Typography>
                </div>
                {user.additionalInfo && (
                  <div>
                    <Typography variant="subtitle1" fontWeight="bold">Additional Info:</Typography>
                    <Typography>{user.additionalInfo}</Typography>
                  </div>
                )}
              </div>
              
              <Typography variant="h6" gutterBottom component="div">
                Services
              </Typography>
              <Box component="div" className="mb-4">
                <Box component="div">
                  <Typography>
                    {user.services.childcare ? "✅ Childcare" : "❌ Childcare"}
                  </Typography>
                </Box>
                <Box component="div">
                  <Typography>
                    {user.services.mealPreparation ? "✅ Meal Preparation" : "❌ Meal Preparation"}
                  </Typography>
                </Box>
                <Box component="div">
                  <Typography>
                    {user.services.lightHousekeeping ? "✅ Light Housekeeping" : "❌ Light Housekeeping"}
                  </Typography>
                </Box>
                <Box component="div">
                  <Typography>
                    {user.services.tutoring ? "✅ Tutoring" : "❌ Tutoring"}
                  </Typography>
                </Box>
                <Box component="div">
                  <Typography>
                    {user.services.petMinding ? "✅ Pet Minding" : "❌ Pet Minding"}
                  </Typography>
                </Box>
              </Box>
              
              <Typography variant="h6" gutterBottom component="div">
                Children
              </Typography>
              {!user.children || user.children.length === 0 ? (
                <Typography>No children registered</Typography>
              ) : (
                <div className="space-y-2">
                  {user.children.map((child) => (
                    <div key={child.id} className="p-2 border rounded">
                      <Box component="div">
                        <Typography>
                          <strong>Name:</strong> {child.firstName} {child.lastName}, <strong>Age:</strong> {child.age}
                        </Typography>
                      </Box>
                      {child.specialNotes && (
                        <Box component="div">
                          <Typography>
                            <strong>Special Notes:</strong> {child.specialNotes}
                          </Typography>
                        </Box>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [updateRequests, setUpdateRequests] = useState<UpdateRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [approveLoading, setApproveLoading] = useState<string | null>(null);
  const [toggleStatusLoading, setToggleStatusLoading] = useState<string | null>(null);
  const [accountStatusFilter, setAccountStatusFilter] = useState<AccountStatus>("ALL");
  
  // User detail states
  const [userDetailOpen, setUserDetailOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);
  const [userDetailLoading, setUserDetailLoading] = useState(false);
  
  // Update request detail states
  const [requestDetailOpen, setRequestDetailOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<UpdateRequest | null>(null);
  const [processRequestLoading, setProcessRequestLoading] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState<string | null>(null);

  // Tab change handler
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Filter change handler
  const handleFilterChange = (status: AccountStatus) => {
    setAccountStatusFilter(status);
    
    if (status === "ALL") {
      setFilteredUsers(users);
    } else if (status === "ACTIVE") {
      setFilteredUsers(users.filter(user => user.isApproved && user.isActive));
    } else if (status === "PENDING") {
      setFilteredUsers(users.filter(user => !user.isApproved));
    } else if (status === "INACTIVE") {
      setFilteredUsers(users.filter(user => user.isApproved && !user.isActive));
    }
  };

  // Redirect if not admin
  useEffect(() => {
    if (status === "authenticated" && !session.user.isAdmin) {
      router.push("/");
    } else if (status === "unauthenticated") {
      router.push("/");
    }
  }, [session, status, router]);

  // Fetch users and update requests
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch users
        const usersResponse = await axios.get("/api/admin/users");
        setUsers(usersResponse.data);
        setFilteredUsers(usersResponse.data);
        
        // Fetch update requests
        const requestsResponse = await axios.get("/api/admin/update-requests");
        setUpdateRequests(requestsResponse.data);
      } catch (error) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated" && session?.user?.isAdmin) {
      fetchData();
    }
  }, [session, status]);

  // Add this function to your AdminPage component

const toggleApprovalStatus = async (userId: string, currentStatus: boolean) => {
  try {
    setApproveLoading(userId);
    console.log(`Toggling user approval: ${userId}, current status: ${currentStatus}, new status: ${!currentStatus}`);
    
    const response = await axios.post(`/api/admin/toggle-approval`, { 
      userId, 
      isApproved: !currentStatus 
    });
    
    console.log("Toggle approval response:", response.data);
    
    // Update user in state
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, isApproved: !currentStatus } : user
    );
    setUsers(updatedUsers);
    
    // Also update filtered users list
    setFilteredUsers(filteredUsers.map((user) =>
      user.id === userId ? { ...user, isApproved: !currentStatus } : user
    ));
    
    // If viewing user details, update the selected user too
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser({
        ...selectedUser,
        isApproved: !currentStatus
      });
    }
    
    setError(null);
    // Show success message
    alert(`User ${!currentStatus ? "approved" : "blocked"} successfully!`);
    
  } catch (error: any) {
    console.error("Error toggling user approval status:", error);
    setError(error.response?.data?.message || "Failed to update user approval status. Please try again.");
  } finally {
    setApproveLoading(null);
  }
};
  const approveUser = async (userId: string) => {
    try {
      setApproveLoading(userId);
      await axios.post(`/api/admin/approve-user`, { userId });
      
      // Update user in state
      const updatedUsers = users.map((user) =>
        user.id === userId ? { ...user, isApproved: true } : user
      );
      setUsers(updatedUsers);
      
      // Update filtered users
      handleFilterChange(accountStatusFilter);
    } catch (error) {
      setError("Failed to approve user. Please try again.");
    } finally {
      setApproveLoading(null);
    }
  };

// Replace this function in your AdminPage component

const toggleActiveStatus = async (userId: string, currentStatus: boolean) => {
  try {
    setToggleStatusLoading(userId);
    console.log(`Toggling user status: ${userId}, current status: ${currentStatus}, new status: ${!currentStatus}`);
    
    const response = await axios.post(`/api/admin/toggle-user-status`, { 
      userId, 
      isActive: !currentStatus 
    });
    
    console.log("Toggle status response:", response.data);
    
    // Update user in state
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, isActive: !currentStatus } : user
    );
    setUsers(updatedUsers);
    
    // Also update filtered users list
    setFilteredUsers(filteredUsers.map((user) =>
      user.id === userId ? { ...user, isActive: !currentStatus } : user
    ));
    
    // If viewing user details, update the selected user too
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser({
        ...selectedUser,
        isActive: !currentStatus
      });
    }
    
    setError(null);
    // Show success message
    alert(`User ${!currentStatus ? "activated" : "deactivated"} successfully!`);
    
  } catch (error: any) {
    console.error("Error toggling user status:", error);
    setError(error.response?.data?.message || "Failed to update user status. Please try again.");
  } finally {
    setToggleStatusLoading(null);
  }
};

  const viewUserDetails = async (userId: string) => {
    try {
      setUserDetailLoading(true);
      const response = await axios.get(`/api/admin/user-details/${userId}`);
      setSelectedUser(response.data);
      setUserDetailOpen(true);
    } catch (error) {
      setError("Failed to fetch user details. Please try again.");
    } finally {
      setUserDetailLoading(false);
    }
  };

  const viewRequestDetails = (request: UpdateRequest) => {
    setSelectedRequest(request);
    setRequestDetailOpen(true);
  };

  const processUpdateRequest = async (requestId: string, approved: boolean) => {
    try {
      setProcessRequestLoading(true);
      setRequestSuccess(null);
      
      await axios.post(`/api/admin/process-request`, { 
        requestId, 
        approved,
        adminComment: approved ? "Approved by admin" : "Rejected by admin"
      });
      
      // Update request in state
      setUpdateRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === requestId ? { ...req, status: approved ? "APPROVED" : "REJECTED" } : req
        )
      );
      
      setRequestSuccess(approved ? "Request approved successfully!" : "Request rejected successfully!");
      
      // Close dialog after a delay
      setTimeout(() => {
        setRequestDetailOpen(false);
        setRequestSuccess(null);
        
        // Refresh data after processing request
        axios.get("/api/admin/update-requests").then(response => {
          setUpdateRequests(response.data);
        });
      }, 2000);
    } catch (error) {
      setError("Failed to process request. Please try again.");
    } finally {
      setProcessRequestLoading(false);
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
        <Paper className="p-6">
          <Typography variant="h4" component="h1" gutterBottom>
            Admin Panel
          </Typography>
          
          {error && (
            <Alert severity="error" className="mb-4" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}
          
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
  <Tabs value={tabValue} onChange={handleTabChange} aria-label="admin tabs">
    <Tab label="User Accounts" />
  </Tabs>
</Box>
          
          {/* User Accounts Tab */}
          {tabValue === 0 && (
            <>
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h6" component="h2">
                  Family Accounts
                </Typography>
                
                <FormControl variant="outlined" size="small" style={{ minWidth: 200 }}>
                  <InputLabel id="account-status-filter-label">Account Status</InputLabel>
                  <Select
                    labelId="account-status-filter-label"
                    value={accountStatusFilter}
                    onChange={(e) => handleFilterChange(e.target.value as AccountStatus)}
                    label="Account Status"
                  >
                    <MenuItem value="ALL">All Accounts</MenuItem>
                    <MenuItem value="ACTIVE">Active Accounts</MenuItem>
                    <MenuItem value="PENDING">Pending Approval</MenuItem>
                    <MenuItem value="INACTIVE">Inactive Accounts</MenuItem>
                  </Select>
                </FormControl>
              </div>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Registration Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          No users found
                        </TableCell>
                      </TableRow>
                    ) : (
                    // Find the part where UserRow components are rendered and update like this:

filteredUsers.map((user) => (
  <UserRow 
    key={user.id}
    user={user}
    toggleApprovalStatus={toggleApprovalStatus}
    toggleActiveStatus={toggleActiveStatus}
    viewUserDetails={viewUserDetails}
    approveLoading={approveLoading}
    toggleStatusLoading={toggleStatusLoading}
  />
))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
          
          {/* Update Requests Tab */}
          {tabValue === 1 && (
            <>
              <Typography variant="h6" component="h2" className="mb-4">
                Update Requests
              </Typography>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Request Type</TableCell>
                      <TableCell>Date Requested</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {updateRequests.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          No update requests found
                        </TableCell>
                      </TableRow>
                    ) : (
                      updateRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>{request.userName}</TableCell>
                          <TableCell>{request.userEmail}</TableCell>
                          <TableCell>
                            {request.requestType.replace('_', ' ')}
                          </TableCell>
                          <TableCell>
                            {new Date(request.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {request.status === "PENDING" && (
                              <Chip label="Pending" color="warning" />
                            )}
                            {request.status === "APPROVED" && (
                              <Chip label="Approved" color="success" />
                            )}
                            {request.status === "REJECTED" && (
                              <Chip label="Rejected" color="error" />
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => viewRequestDetails(request)}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Paper>
      </main>

      {/* User Detail Dialog */}
      <Dialog open={userDetailOpen} onClose={() => setUserDetailOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent dividers>
          {userDetailLoading ? (
            <div className="flex justify-center py-4">
              <CircularProgress />
            </div>
          ) : selectedUser && (
            <div className="space-y-6">
              <div>
                <Typography variant="h6" gutterBottom>Personal Information</Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Typography variant="subtitle1" fontWeight="bold">Name:</Typography>
                    <Typography>{selectedUser.firstName} {selectedUser.lastName}</Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle1" fontWeight="bold">Email:</Typography>
                    <Typography>{selectedUser.email}</Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle1" fontWeight="bold">Phone:</Typography>
                    <Typography>{selectedUser.phone}</Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle1" fontWeight="bold">Address:</Typography>
                    <Typography>{selectedUser.address}, {selectedUser.city}, {selectedUser.postalCode}</Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle1" fontWeight="bold">Status:</Typography>
                    <Box sx={{ mt: 1 }}>
                      {!selectedUser.isApproved ? (
                        <Chip label="Pending" color="warning" size="small" />
                      ) : selectedUser.isActive ? (
                        <Chip label="Active" color="success" size="small" />
                      ) : (
                        <Chip label="Inactive" color="error" size="small" />
                      )}
                    </Box>
                  </div>
                  <div>
                    <Typography variant="subtitle1" fontWeight="bold">Registration Date:</Typography>
                    <Typography>{new Date(selectedUser.createdAt).toLocaleDateString()}</Typography>
                  </div>
                </div>
                {selectedUser.additionalInfo && (
                  <div className="mt-4">
                    <Typography variant="subtitle1" fontWeight="bold">Additional Information:</Typography>
                    <Typography>{selectedUser.additionalInfo}</Typography>
                  </div>
                )}
              </div>

              <div>
                <Typography variant="h6" gutterBottom>Children</Typography>
                {!selectedUser.children || selectedUser.children.length === 0 ? (
                  <Typography>No children registered</Typography>
                ) : (
                  <div className="space-y-4">
                    {selectedUser.children.map((child) => (
                      <Paper key={child.id} className="p-4 border rounded-md">
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

              <div>
                <Typography variant="h6" gutterBottom>Services Selected</Typography>
                <Box component="div" className="space-y-2">
                  <Box component="div">
                    <Typography>
                      {selectedUser.services.childcare ? "✅ Childcare" : "❌ Childcare"}
                    </Typography>
                  </Box>
                  <Box component="div">
                    <Typography>
                      {selectedUser.services.mealPreparation ? "✅ Meal Preparation" : "❌ Meal Preparation"}
                    </Typography>
                  </Box>
                  <Box component="div">
                    <Typography>
                      {selectedUser.services.lightHousekeeping ? "✅ Light Housekeeping" : "❌ Light Housekeeping"}
                    </Typography>
                  </Box>
                  <Box component="div">
                    <Typography>
                      {selectedUser.services.tutoring ? "✅ Tutoring" : "❌ Tutoring"}
                    </Typography>
                  </Box>
                  <Box component="div">
                    <Typography>
                      {selectedUser.services.petMinding ? "✅ Pet Minding" : "❌ Pet Minding"}
                    </Typography>
                  </Box>
                </Box>
              </div>

              {selectedUser.paymentInfo && (
                <div>
                  <Typography variant="h6" gutterBottom>Payment Information</Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Typography variant="subtitle1" fontWeight="bold">Name on Card:</Typography>
                      <Typography>{selectedUser.paymentInfo.nameOnCard}</Typography>
                    </div>
                    <div>
                      <Typography variant="subtitle1" fontWeight="bold">Card Number:</Typography>
                      <Typography>
                        ••••••••••••{selectedUser.paymentInfo.cardNumber.slice(-4)}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="subtitle1" fontWeight="bold">Expiry Date:</Typography>
                      <Typography>{selectedUser.paymentInfo.expiryDate}</Typography>
                    </div>
                    <div>
                      <Typography variant="subtitle1" fontWeight="bold">Save for Future Bookings:</Typography>
                      <Typography>{selectedUser.paymentInfo.saveCard ? "Yes" : "No"}</Typography>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
        {/* // Update the dialog actions section in the user detail dialog */}

<DialogActions>
  <Button onClick={() => setUserDetailOpen(false)}>Close</Button>
  {selectedUser && (
    <>
      <Button 
        variant={selectedUser.isApproved ? "outlined" : "contained"} 
        color={selectedUser.isApproved ? "error" : "success"} 
        onClick={() => {
          toggleApprovalStatus(selectedUser.id, selectedUser.isApproved);
          setUserDetailOpen(false);
        }}
        disabled={!!approveLoading}
        startIcon={approveLoading ? <CircularProgress size={20} /> : null}
      >
        {approveLoading ? "Processing..." : selectedUser.isApproved ? "Block User" : "Approve User"}
      </Button>
      
      {/* {selectedUser.isApproved && (
        <Button 
          variant={selectedUser.isActive ? "outlined" : "contained"} 
          color={selectedUser.isActive ? "error" : "success"} 
          onClick={() => {
            toggleActiveStatus(selectedUser.id, selectedUser.isActive);
            setUserDetailOpen(false);
          }}
          disabled={!!toggleStatusLoading}
          startIcon={
            toggleStatusLoading ? (
              <CircularProgress size={20} />
            ) : selectedUser.isActive ? (
              <BlockIcon />
            ) : (
              <CheckCircleIcon />
            )
          }
        >
          {toggleStatusLoading ? "Processing..." : selectedUser.isActive ? "Deactivate User" : "Activate User"}
        </Button>
      )} */}
    </>
  )}
</DialogActions>
      </Dialog>

      {/* Update Request Detail Dialog */}
      <Dialog open={requestDetailOpen} onClose={() => setRequestDetailOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Update Request Details</DialogTitle>
        <DialogContent dividers>
          {requestSuccess && (
            <Alert severity="success" className="mb-4">
              {requestSuccess}
            </Alert>
          )}
          
          {selectedRequest && (
            <div className="space-y-4">
              <div>
                <Typography variant="subtitle1" fontWeight="bold">Request Type:</Typography>
                <Typography>{selectedRequest.requestType.replace('_', ' ')}</Typography>
              </div>
              
              <div>
                <Typography variant="subtitle1" fontWeight="bold">User:</Typography>
                <Typography>{selectedRequest.userName} ({selectedRequest.userEmail})</Typography>
              </div>
              
              <div>
                <Typography variant="subtitle1" fontWeight="bold">Date Requested:</Typography>
                <Typography>{new Date(selectedRequest.createdAt).toLocaleString()}</Typography>
              </div>
              
              <div>
                <Typography variant="subtitle1" fontWeight="bold">Status:</Typography>
                <Box sx={{ mt: 1 }}>
                  {selectedRequest.status === "PENDING" && (
                    <Chip label="Pending" color="warning" size="small" />
                  )}
                  {selectedRequest.status === "APPROVED" && (
                    <Chip label="Approved" color="success" size="small" />
                  )}
                  {selectedRequest.status === "REJECTED" && (
                    <Chip label="Rejected" color="error" size="small" />
                  )}
                </Box>
              </div>
              
              <div>
                <Typography variant="subtitle1" fontWeight="bold">Request Data:</Typography>
                <Paper className="p-4 bg-gray-50 mt-2">
                  {selectedRequest.requestType === "PROFILE_UPDATE" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Typography variant="body2" fontWeight="bold">Name:</Typography>
                        <Typography variant="body2">
                          {selectedRequest.requestData.firstName} {selectedRequest.requestData.lastName}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="body2" fontWeight="bold">Phone:</Typography>
                        <Typography variant="body2">{selectedRequest.requestData.phone}</Typography>
                      </div>
                      <div>
                        <Typography variant="body2" fontWeight="bold">Address:</Typography>
                        <Typography variant="body2">
                          {selectedRequest.requestData.address}, {selectedRequest.requestData.city}, {selectedRequest.requestData.postalCode}
                        </Typography>
                      </div>
                      {selectedRequest.requestData.additionalInfo && (
                        <div className="md:col-span-2">
                          <Typography variant="body2" fontWeight="bold">Additional Info:</Typography>
                          <Typography variant="body2">{selectedRequest.requestData.additionalInfo}</Typography>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {selectedRequest.requestType === "SERVICE_UPDATE" && (
                    <Box component="div" className="space-y-1">
                      <Box component="div">
                        <Typography variant="body2">
                          Childcare: {selectedRequest.requestData.childcare ? "✅" : "❌"}
                        </Typography>
                      </Box>
                      <Box component="div">
                        <Typography variant="body2">
                          Meal Preparation: {selectedRequest.requestData.mealPreparation ? "✅" : "❌"}
                        </Typography>
                      </Box>
                      <Box component="div">
                        <Typography variant="body2">
                          Light Housekeeping: {selectedRequest.requestData.lightHousekeeping ? "✅" : "❌"}
                        </Typography>
                      </Box>
                      <Box component="div">
                        <Typography variant="body2">
                          Tutoring: {selectedRequest.requestData.tutoring ? "✅" : "❌"}
                        </Typography>
                      </Box>
                      <Box component="div">
                        <Typography variant="body2">
                          Pet Minding: {selectedRequest.requestData.petMinding ? "✅" : "❌"}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  
                  {selectedRequest.requestType === "CHILD_UPDATE" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Typography variant="body2" fontWeight="bold">Name:</Typography>
                        <Typography variant="body2">
                          {selectedRequest.requestData.firstName} {selectedRequest.requestData.lastName}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="body2" fontWeight="bold">Age:</Typography>
                        <Typography variant="body2">{selectedRequest.requestData.age}</Typography>
                      </div>
                      {selectedRequest.requestData.specialNotes && (
                        <div className="md:col-span-2">
                          <Typography variant="body2" fontWeight="bold">Special Notes:</Typography>
                          <Typography variant="body2">{selectedRequest.requestData.specialNotes}</Typography>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {selectedRequest.requestType === "CHILD_ADD" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Typography variant="body2" fontWeight="bold">Name:</Typography>
                        <Typography variant="body2">
                          {selectedRequest.requestData.firstName} {selectedRequest.requestData.lastName}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="body2" fontWeight="bold">Age:</Typography>
                        <Typography variant="body2">{selectedRequest.requestData.age}</Typography>
                      </div>
                      {selectedRequest.requestData.specialNotes && (
                        <div className="md:col-span-2">
                          <Typography variant="body2" fontWeight="bold">Special Notes:</Typography>
                          <Typography variant="body2">{selectedRequest.requestData.specialNotes}</Typography>
                        </div>
                      )}
                    </div>
                  )}
                </Paper>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRequestDetailOpen(false)}>Close</Button>
          
          {selectedRequest && selectedRequest.status === "PENDING" && (
            <>
              <Button 
                variant="outlined" 
                color="error"
                onClick={() => processUpdateRequest(selectedRequest.id, false)}
                disabled={processRequestLoading}
              >
                Reject
              </Button>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => processUpdateRequest(selectedRequest.id, true)}
                disabled={processRequestLoading}
                startIcon={processRequestLoading ? <CircularProgress size={20} /> : null}
              >
                {processRequestLoading ? "Processing..." : "Approve"}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}