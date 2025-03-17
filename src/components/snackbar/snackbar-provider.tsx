'use client';
import CloseIcon from '@mui/icons-material/Close';
import { Snackbar, Alert, AlertTitle, IconButton } from '@mui/material';
import React, { useState } from 'react';

import { SnackbarContext } from './contexts/snackbar-context';
import { SnackbarOptions } from './snackbar.types';

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<SnackbarOptions | null>(null);

  const showSnackbar = (newOptions: SnackbarOptions) => {
    setOptions(newOptions);
    setOpen(true);
  };

  const hideSnackbar = () => {
    setOpen(false);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') return;
    hideSnackbar();
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
      {children}
      {options && (
        <Snackbar
          open={open}
          autoHideDuration={options.duration || 6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            severity={options.type || 'info'}
            onClose={handleClose}
            sx={{
              width: '100%',
              minWidth: '300px',
              borderRadius: '8px',
              '& .MuiAlert-message': {
                width: '100%',
              },
            }}
            action={
              options.action ? (
                <>
                  <IconButton
                    size='small'
                    onClick={options.action.onClick}
                    sx={{ mr: 1 }}
                  >
                    {options.action.label}
                  </IconButton>
                  <IconButton size='small' onClick={handleClose}>
                    <CloseIcon fontSize='small' />
                  </IconButton>
                </>
              ) : (
                <IconButton size='small' onClick={handleClose}>
                  <CloseIcon fontSize='small' />
                </IconButton>
              )
            }
          >
            {options.title && <AlertTitle>{options.title}</AlertTitle>}
            {options.message}
          </Alert>
        </Snackbar>
      )}
    </SnackbarContext.Provider>
  );
};
