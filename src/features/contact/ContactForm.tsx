'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useSnackbar } from '@/components/snackbar';
import { contactSchema, IContact } from '@/types/contact';

import { Button } from '../../components/buttons/Button.style';
import { StyledTextField } from '../../components/form/text-field.style';
import { ContactFormContainer } from '../../features/contact/ContactForm.style';

const defaultValues: IContact = {
  name: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
};

export default function ContactForm() {
  const { showSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IContact>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<IContact> = async (data) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit contact form');
      }

      showSnackbar({
        type: 'success',
        title: 'Message Sent',
        message: 'Your message has been sent successfully!',
      });
      
      reset();
    } catch  {
      showSnackbar({
        type: 'error',
        title: 'Submission Failed',
        message: 'Failed to send your message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ContactFormContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container columns={24} columnSpacing={4} rowSpacing={2}>
            <Grid size={{ xs: 24, md: 12 }}>
              <StyledTextField
                label='Name'
                variant='standard'
                fullWidth
                margin='normal'
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register('name')}
                inputfontsize='20px'
                labelfontsize='14px'
              />
            </Grid>
            <Grid size={{ xs: 24, md: 12 }}>
              <StyledTextField
                label='Last Name'
                variant='standard'
                fullWidth
                margin='normal'
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                {...register('lastName')}
                inputfontsize='20px'
                labelfontsize='14px'
              />
            </Grid>
            <Grid size={{ xs: 24, md: 12 }}>
              <StyledTextField
                label='Email'
                variant='standard'
                fullWidth
                margin='normal'
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register('email')}
                inputfontsize='20px'
                labelfontsize='14px'
              />
            </Grid>
            <Grid size={{ xs: 24, md: 12 }}>
              <StyledTextField
                label='Phone'
                variant='standard'
                fullWidth
                margin='normal'
                error={!!errors.phone}
                helperText={errors.phone?.message}
                {...register('phone')}
                inputfontsize='20px'
                labelfontsize='14px'
              />
            </Grid>
            <Grid size={{ xs: 24, md: 24 }}>
              <StyledTextField
                label='Message'
                variant='standard'
                fullWidth
                margin='normal'
                error={!!errors.message}
                helperText={errors.message?.message}
                {...register('message')}
                inputfontsize='20px'
                labelfontsize='14px'
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: { xs: '30px', lg: '60px' } }}>
            <Button
              type='submit'
              special
              fontSize='14px'
              borderRadius='4px'
              width='170px'
              height='41px'
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Send Message'}
            </Button>
          </Box>
        </form>
      </ContactFormContainer>
    </>
  );
}