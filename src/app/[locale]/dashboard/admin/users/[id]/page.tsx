'use client';

import { Box, CircularProgress, Grid, Tab, Tabs } from '@mui/material';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { parseAsNumberLiteral, useQueryState } from 'nuqs';
import React, { useState } from 'react';

import { Button } from '@/components/buttons/Button.style';
import { useSnackbar } from '@/components/snackbar';
import ApprovalForm from '@/features/dashboard/dashboard-admin/user-approval/ApprovalForm';
import { useUserApproval } from '@/hooks/useUserApproval';
import { useUserById } from '@/hooks/useUserById';

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const { showSnackbar } = useSnackbar();

  const [tabValue, setTabValue] = useQueryState(
    'tab',
    parseAsNumberLiteral([0, 1, 2]).withDefault(0),
  );

  const { data: user, isLoading } = useUserById(id);
  const [seenValues, setSeenValues] = useState({
    0: false,
    1: false,
    2: false,
  });

  const { mutate: toggleApproval, isPending: isApproving } = useUserApproval();

  const router = useRouter();
  const handleApproval = () => {
    setSeenValues({ ...seenValues, [tabValue]: true });

    if (!user) return;

    // Check if any tab has not been seen yet
    const unseenTabIndex = Object.entries(seenValues).find(
      ([tab, seen]) => !seen && Number(tab) !== tabValue
    )?.[0];

    // If there's an unseen tab, switch to it
    if (unseenTabIndex !== undefined) {
      const tabIndex = Number(unseenTabIndex) as 0 | 1 | 2;

      setTabValue(tabIndex);

      return;
    }

    toggleApproval(id, {
      onSuccess(data, variables, context) {

        showSnackbar({
          type: 'success',
          title: 'Approval Successful',
          message: 'User has been approved successfully',
        });

        router.back();
      },
    });
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Tabs value={tabValue} onChange={(_, val) => setTabValue(val)}>
        <Tab label='Edit Profile' />
        <Tab label='Service and Qualifications' />
        <Tab label='Payment Details' />
      </Tabs>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={2}>
          <Box
            sx={{
              borderRadius: '50%',
              backgroundColor: 'gray',
              width: 165,
              height: 165,
              overflow: 'hidden',
            }}
          >
            <Image
              src={''}
              alt={'clientName'}
              height={165}
              width={165}
              style={{ objectFit: 'cover', borderRadius: '50%' }}
            />
          </Box>
        </Grid>
        <Grid item xs={10}>
          {user &&
            <ApprovalForm tab={tabValue} data={user} />
          }
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'end', mt: 3 }}>
        <Button special width='200px' onClick={handleApproval}>
          {user?.isApproved ? 'Unapprove' : 'Approve'}
        </Button>
      </Box>
    </>
  );
};

export default Page;
