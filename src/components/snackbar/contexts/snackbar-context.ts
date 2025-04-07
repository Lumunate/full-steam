import { createContext } from 'react';

import { SnackbarContextType } from '../snackbar.types';

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);
