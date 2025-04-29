'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  CircularProgress,
  FormHelperText,
  InputLabel,
  MenuItem,
  Rating,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useSnackbar } from '@/components/snackbar';
import { feedbackSchema, IFeedback } from '@/types/feedback';

import { FeedbackFormContainer } from './FeedbackFrom.style';
import { Button } from '../../components/buttons/Button.style';
import {
  CustomFormControl,
  StyledSelectField,
  StyledTextField,
  CustomInputLabel,
} from '../../components/form/text-field.style';

const defaultValues: IFeedback = {
  name: '',
  lastName: '',
  relation: '',
  email: '',
  sessionDate: new Date(),
  experience: '4',
  feedback: '',
};

const relationOptions = [
  { value: 'childcare', label: 'Childcare' },
  { value: 'tutoring', label: 'Tutoring' },
  { value: 'housekeeping', label: 'Housekeeping' },
  { value: 'babysitting', label: 'Babysitting' },
  { value: 'other', label: 'Other' },
];

export default function FeedbackForm() {
  const { showSnackbar } = useSnackbar();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFeedback>({
    resolver: zodResolver(feedbackSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<IFeedback> = async (data) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          experience: String(data.experience),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      showSnackbar({
        type: 'success',
        title: 'Success',
        message: 'Thank you for your feedback! We appreciate your input.',
      });
      
      reset();
      
      // Optional: redirect after successful submission
      // router.push('/en/thank-you');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      showSnackbar({
        type: 'error',
        title: 'Error',
        message: 'Failed to submit feedback. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FeedbackFormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          columns={24}
          columnSpacing={{ xs: '20px', lg: '40px' }}
          rowSpacing={{ xs: '20px', lg: '40px' }}
          alignItems={'start'}
          sx={{ mb: '40px' }}
        >
          <Grid size={{ xs: 24, md: 12 }}>
            <StyledTextField
              label='Name'
              variant='standard'
              fullWidth
              margin='none'
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register('name')}
              inputfontsize='18px'
              labelfontsize='16px'
            />
          </Grid>
          <Grid size={{ xs: 24, md: 12 }}>
            <StyledTextField
              label='Last Name'
              variant='standard'
              fullWidth
              margin='none'
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              {...register('lastName')}
              inputfontsize='18px'
              labelfontsize='16px'
            />
          </Grid>
        </Grid>

        <Box sx={{ marginBottom: '40px' }}>
          <CustomFormControl
            fullWidth
            variant='standard'
            labelfontsize='16px'
            error={!!errors.relation}
          >
            <InputLabel id='relation'>Type of Service</InputLabel>
            <Controller
              name='relation'
              control={control}
              render={({ field }) => (
                <StyledSelectField
                  labelId='relation'
                  value={field.value}
                  onChange={field.onChange}
                  variant='standard'
                  inputfontsize='18px'
                  fullWidth
                  IconComponent={() => (
                    <Image
                      src='/icons/arrow-down.svg'
                      alt='Custom Dropdown Icon'
                      width={7}
                      height={8}
                    />
                  )}
                  MenuProps={{
                    disableScrollLock: true,
                  }}
                >
                  {relationOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </StyledSelectField>
              )}
            />
            {errors.relation && (
              <FormHelperText error>{errors.relation?.message}</FormHelperText>
            )}
          </CustomFormControl>
        </Box>

        <Box sx={{ marginBottom: '40px' }}>
          <StyledTextField
            label='Email'
            variant='standard'
            fullWidth
            margin='none'
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email')}
            inputfontsize='18px'
            labelfontsize='16px'
          />
        </Box>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            marginBottom: '40px',
          }}
        >
          <CustomInputLabel id='experience'>Rate Your Experience</CustomInputLabel>
          <Controller
            name='experience'
            control={control}
            render={({ field }) => (
              <Rating
                name='experience'
                value={field.value ? Number(field.value) : 4}
                onChange={(_, newValue) => field.onChange(String(newValue))}
                size='large'
                icon={
                  <Image
                    src='/icons/star.svg'
                    alt='Filled Star'
                    width={26}
                    height={25}
                  />
                }
                emptyIcon={
                  <Image
                    src='/icons/unfilled-star.svg'
                    alt='Outlined Star'
                    width={26}
                    height={25}
                  />
                }
                sx={{
                  '& .MuiRating-icon': {
                    marginRight: '5px',
                  },
                }}
              />
            )}
          />
          {errors.experience && (
            <FormHelperText error>{errors.experience?.message}</FormHelperText>
          )}
        </Box>

        <Box sx={{ marginBottom: '40px' }}>
          <StyledTextField
            label='Share Your Experience Here...'
            variant='standard'
            fullWidth
            multiline
            rows={5}
            margin='none'
            error={!!errors.feedback}
            helperText={errors.feedback?.message}
            {...register('feedback')}
            inputfontsize='18px'
            labelfontsize='16px'
          />
        </Box>

        <Button
          type='submit'
          special
          fontSize='14px'
          borderRadius='4px'
          width='170px'
          height='41px'
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Submit Feedback'}
        </Button>
      </form>
    </FeedbackFormContainer>
  );
}