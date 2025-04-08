'use client';

import { useQueryState } from 'nuqs';

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

export default function LoginForm() {
  const [value, setValue] = useQueryState('role', { defaultValue: 'mom' });

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
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
          name='email'
          fullWidth
        />
        <StyledInputLabel htmlFor='password'>Password</StyledInputLabel>
        <StyledInputField
          type='password'
          id='password'
          name='password'
          fullWidth
          disableUnderline
        />

        <Link
          href='/'
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
        >
          Login
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
  );
}
