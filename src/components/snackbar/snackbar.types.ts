export type SnackbarType = 'success' | 'error' | 'warning' | 'info';

export interface SnackbarOptions {
  title?: string;
  message: string;
  type?: SnackbarType;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface SnackbarContextType {
  showSnackbar: (options: SnackbarOptions) => void;
  hideSnackbar: () => void;
}
