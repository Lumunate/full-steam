'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useSnackbar } from '@/components/snackbar';
import { contactSchema, IContact } from '@/types/contact';

import { Button } from '../../components/buttons/Button.style';
import { StyledTextField } from '../../components/form/Form.style';
import { ContactFormContainer } from '../../features/contact/ContactForm.style';
import { useSubmitContactForm } from '../../hooks/useContactForm';

const defaultValues: IContact = {
  name: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
};

export default function ContactForm() {
  const { showSnackbar } = useSnackbar();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<IContact>({
    resolver: zodResolver(contactSchema),
    defaultValues
  });

  const { mutate: submitForm, isPending } = useSubmitContactForm();
  const onSubmit: SubmitHandler<IContact> = async (data) => {
    submitForm(data, {
      onSuccess: () => {
        showSnackbar({ message: 'Form submitted successfully!' });
        reset();
      },
      onError: () => {
        showSnackbar({ message: 'Failed to submit Contact Form. Please try again later!' });
      }
    });
  };

  return (
    <>
      <ContactFormContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container columns={24} columnSpacing={4} rowSpacing={2}>
            <Grid size={{ xs: 24, md: 12 }}>
              <StyledTextField
                label="Name"
                variant="standard"
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register('name')}
                inputfontsize="20px"
                labelfontsize="14px"
              />
            </Grid>
            <Grid size={{ xs: 24, md: 12 }}>
              <StyledTextField
                label="Last Name"
                variant="standard"
                fullWidth
                margin="normal"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                {...register('lastName')}
                inputfontsize="20px"
                labelfontsize="14px"
              />
            </Grid>
            <Grid size={{ xs: 24, md: 12 }}>
              <StyledTextField
                label="Email"
                variant="standard"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register('email')}
                inputfontsize="20px"
                labelfontsize="14px"
              />
            </Grid>
            <Grid size={{ xs: 24, md: 12 }}>
              <StyledTextField
                label="Phone"
                variant="standard"
                fullWidth
                margin="normal"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                {...register('phone')}
                inputfontsize="20px"
                labelfontsize="14px"
              />
            </Grid>
            <Grid size={{ xs: 24, md: 24 }}>
              <StyledTextField
                label="Message"
                variant="standard"
                fullWidth
                margin="normal"
                error={!!errors.message}
                helperText={errors.message?.message}
                {...register('message')}
                inputfontsize="20px"
                labelfontsize="14px"
              />
            </Grid>
          </Grid>
          <Box sx={{mt: {xs: '30px', lg: '60px'}}}>
            <Button
              type='submit'
              special
              fontSize='14px'
              borderRadius='4px'
              width='170px'
              height='41px'
            >
              {isPending ? <CircularProgress size={24} /> : 'Send Message'}
            </Button>
          </Box>
        </form>
      </ContactFormContainer>
    </>
  );
}
