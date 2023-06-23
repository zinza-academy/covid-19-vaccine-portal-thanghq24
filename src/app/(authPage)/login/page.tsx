'use client';
import { Button, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { indigo } from '@mui/material/colors';
import TextInput from '@components/sharedComponents/TextInput';
import { useRouter } from 'next/navigation';
import useLogin from '@src/api/authApi/login';

interface LoginFormData {
  email: string;
  password: string;
}

const schema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().trim().min(8).required()
  })
  .required();

const Login: FC = () => {
  const router = useRouter();
  const loginMutation = useLogin();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid }
  } = useForm<LoginFormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (loginFormData: LoginFormData) => {
    loginMutation.mutate(loginFormData);
  };

  const canSubmit = !isValid || !isDirty || loginMutation.isLoading;

  const goToRegister = () => {
    router.push('/register');
  };

  return (
    <Stack spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" fontWeight="700">
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
          borderBottomLeftRadius: '8px',
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
          borderBottomLeftRadius: '8px',
          textTransform: 'none'
        }}
        onClick={goToRegister}>
        Đăng ký
      </Button>
    </Stack>
  );
};

export default Login;
