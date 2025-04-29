'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useQueryState } from 'nuqs';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/buttons/Button.style';
import { Link } from '@/i18n/routing';

import {
  RadioContainer,
  StyledRadio,
  StyledLabel,
} from '../../components/form/Froms.style';
import { FormContainer } from '../../components/form/Froms.style';
import {
  StyledInputField,
  StyledInputLabel,
} from '../../components/form/Froms.style';
import { RegisterTypography } from '../../components/form/Froms.style';
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginInputs = z.infer<typeof loginSchema>;
export default function LoginForm() {
  const [value, setValue] = useQueryState('role', { defaultValue: 'mom' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        setError('Invalid email or password');
        setOpenSnackbar(true);
        setLoading(false);

        return;
      }
      try {
        const userResponse = await fetch('/api/auth/me');

        if (userResponse.ok) {
          const userData = await userResponse.json();
          const userRole = userData.role;

          if (userRole === 'USER') {
            router.push('/en/dashboard/mom/overview');
          } else if (userRole === 'HELPER') {
            router.push('/en/dashboard');
          } else if (userRole === 'ADMIN' || userRole === 'SERVICE_MASTER') {
            router.push('/en/dashboard/admin/overview');
          } else {
            router.push('/en/dashboard');
          }
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch  {
        if (value === 'mom') {
          router.push('/en/dashboard/mom/overview');
        } else {
          router.push('/en/dashboard');
        }
      }
    } catch  {
      setError('An error occurred during login. Please try again.');
      setOpenSnackbar(true);
      setLoading(false);
    }
  };

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setOpenSnackbar(false)}>
          {error}
        </Alert>
      </Snackbar>
      <form
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <RadioContainer value={value} onChange={e => setValue(e.target.value)}>
          <StyledLabel
            value='mom'
            control={<StyledRadio />}
            label='Mom'
            isselected={value === 'mom'}
          />
          <StyledLabel
            value='mom-helper'
            control={<StyledRadio />}
            label='Mom Helper'
            isselected={value === 'mom-helper'}
          />
        </RadioContainer>
        <FormContainer customwidth='630px'>
          <StyledInputLabel htmlFor='email'>Email</StyledInputLabel>
          <StyledInputField
            disableUnderline
            type='email'
            id='email'
            fullWidth
            error={!!errors.email}
            {...register('email')}
          />
          {errors.email && (
            <p style={{ color: 'red', margin: '4px 0' }}>{errors.email.message}</p>
          )}
          <StyledInputLabel htmlFor='password'>Password</StyledInputLabel>
          <StyledInputField
            type='password'
            id='password'
            fullWidth
            disableUnderline
            error={!!errors.password}
            {...register('password')}
          />
          {errors.password && (
            <p style={{ color: 'red', margin: '4px 0' }}>{errors.password.message}</p>
          )}
          <Link
            href='/forgot-password'
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '8px',
              marginBottom: '8px',
            }}
          >
            Forgot Password?
          </Link>
          <Button
            special
            type='submit'
            padding='30px 90px'
            fontSize='18px'
            borderRadius='15px'
            sx={{ margin: 'auto' }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
          <RegisterTypography>
            Don&apos;t have a account yet?
            <Link
              href={
                value === 'mom'
                  ? '/registeration-mom'
                  : '/registeration-mom-helper'
              }
              style={{ color: '#00C8FF' }}
            >
              {' '}
              &nbsp;Register Now
            </Link>
          </RegisterTypography>
        </FormContainer>
      </form>
    </>
  );
}