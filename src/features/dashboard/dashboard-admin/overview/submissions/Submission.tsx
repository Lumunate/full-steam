'use client';
import { Box, CircularProgress, Typography, Modal, Paper, Avatar } from '@mui/material';
import { useState } from 'react';

import DashboardNotification from '@/components/dashboard-notification/DashboardNotification';
import { useAllUsers } from '@/hooks/useAllUsers';
import { useUserApproval } from '@/hooks/useUserApproval';

import { SubmissionsBox } from './Submissions.style';
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  maxHeight: '80vh',
  overflow: 'auto'
};

export default function Submissions() {
  const { users, isLoading, refetch } = useAllUsers();
  const { mutate: toggleApproval, isPending: isApproving } = useUserApproval();
  const [viewingDocument, setViewingDocument] = useState<string | null>(null);
  const helperUsers = users.filter(user => user.role === 'HELPER');
  const handleApproval = (userId: string) => {
    toggleApproval(userId, {
      onSuccess: () => {
        refetch();
      }
    });
  };
  const handleViewDocument = (documentUrl: string) => {
    if (documentUrl) {
      setViewingDocument(documentUrl);
    }
  };
  const handleCloseModal = () => {
    setViewingDocument(null);
  };

  if (isLoading) {
    return (
      <SubmissionsBox>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      </SubmissionsBox>
    );
  }
  if (helperUsers.length === 0) {
    return (
      <SubmissionsBox>
        <Typography variant="body1" sx={{ p: 2 }}>No helper applications found.</Typography>
      </SubmissionsBox>
    );
  }
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: '2-digit' 
    });
  };
  const getProfileImage = (image: string | null | undefined) => {
    return image && image.trim() !== '' 
      ? image 
      : '/dashboard/dashboard-overview/notification-profice-pics/anderson.png';
  };

  return (
    <>
      <SubmissionsBox>
        {helperUsers.map((user) => (
          <DashboardNotification
            key={user.id}
            role="Mom Helper"
            clientName={`${user.firstName} ${user.lastName || ''}`}
            clientProfilePic={getProfileImage(user.image)}
            submissionDate={formatDate(new Date(user.createdAt).toISOString())}
            buttonAction={user.isApproved ? 'approved' : 'pending'}
            viewDocument={Boolean(user.governmentIdDocumentUrl || user.policeCheckDocumentUrl)}
            onButtonClick={() => handleApproval(user.id)}
            onViewDocumentClick={() => handleViewDocument(
              user.governmentIdDocumentUrl || user.policeCheckDocumentUrl || ''
            )}
          />
        ))}
      </SubmissionsBox>
      {}
      <Modal
        open={viewingDocument !== null}
        onClose={handleCloseModal}
        aria-labelledby="document-viewer"
        aria-describedby="view applicant document"
      >
        <Paper sx={modalStyle}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Document Preview
          </Typography>
          {viewingDocument && (
            viewingDocument.endsWith('.pdf') ? (
              <iframe
                src={viewingDocument}
                width="100%"
                height="500px"
                style={{ border: 'none' }}
                title="Document Preview"
              />
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <Avatar 
                  src={viewingDocument} 
                  alt="Document Preview" 
                  sx={{ width: '100%', height: 'auto', maxWidth: '500px', maxHeight: '500px', margin: '0 auto' }} 
                />
                {/* <img 
                  src={viewingDocument} 
                  alt="Document Preview" 
                  style={{ maxWidth: '100%', maxHeight: '500px' }}
                /> */}
              </Box>
            )
          )}
        </Paper>
      </Modal>
    </>
  );
}