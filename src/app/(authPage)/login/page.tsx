'use client';
import {
  Button,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  Typography,
  useTheme
} from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { indigo } from '@mui/material/colors';
import TextInput from '@components/sharedComponents/TextInput';
import { useRouter } from 'next/navigation';

interface LoginFormData {
  email: string;
  password: string;
  loading: boolean;
  success: boolean;
}

const schema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().trim().min(8).required(),
    loading: yup.boolean().required(),
    success: yup.boolean().required()
  })
  .required();

export default function Login() {
  const theme = useTheme();
  const router = useRouter();
  const {
    control,
    watch,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting, isDirty, isValid }
  } = useForm<LoginFormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      loading: false,
      success: true
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: LoginFormData) => {
    setValue('loading', true);
    setTimeout(() => {
      alert(
        getValues('success')
          ? 'trying to log in with this data: ' +
              JSON.stringify({ email: data.email, password: data.password })
          : 'Có lỗi xảy ra'
      );
      setValue('loading', false);
    }, 2000);
  };

  watch('loading');

  const canSubmit = !isValid || !isDirty || !!getValues('loading');

  const goToRegister = () => {
    router.push('/register');
  };

  const goToForgotPassword = () => {
    router.push('/forgot-password');
  };

  return (
    <Stack spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" fontWeight="700" onClick={() => canSubmit()}>
        Đăng nhập với tài khoản
      </Typography>
      <TextInput
        control={control}
        name="email"
        label="Email"
        placeholder="Email"
        errorMessage="Email không được bỏ trống và phải đúng định dạng"
      />
      <TextInput
        control={control}
        name="password"
        label="Mật khẩu"
        placeholder="Mật khẩu"
        errorMessage="Mật khẩu không được bỏ trống"
        type="password"
      />
      <Link passHref href="/forgot-password">
        <Typography align="right" variant="body2" color={indigo[600]}>
          Quên mật khẩu?
        </Typography>
      </Link>
      <Button
        variant="contained"
        color="success"
        size="large"
        sx={{
          fontWeight: '700',
          fontSize: '15px',
          textTransform: 'none'
        }}
        type="submit"
        disabled={canSubmit}>
        Đăng nhâp
      </Button>
      <Typography align="center">
        Hoặc đăng ký tài khoản, nếu bạn chưa đăng ký!
      </Typography>
      <Button
        variant="outlined"
        color="success"
        size="large"
        sx={{
          fontWeight: '700',
          fontSize: '15px',
          textTransform: 'none'
        }}
        onClick={goToRegister}>
        Đăng ký
      </Button>
      <Controller
        name="success"
        control={control}
        render={({ field }) => (
          <FormGroup>
            <FormControlLabel
              control={<Switch defaultChecked />}
              {...field}
              label="Fake API Call Success?"
            />
          </FormGroup>
        )}
      />
    </Stack>
  );
}
