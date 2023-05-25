'use client';
import {
  Button,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { indigo } from '@mui/material/colors';
import TextInput from '@components/sharedComponents/TextInput';
import { useRouter } from 'next/navigation';

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

export default function Login() {
  const router = useRouter();
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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);

  const onSubmit = (data: LoginFormData) => {
    setLoading(true);
    setTimeout(() => {
      alert(
        success
          ? 'trying to log in with this data: ' +
              JSON.stringify({ email: data.email, password: data.password })
          : 'Có lỗi xảy ra'
      );
      setLoading(false);
    }, 2000);
  };

  const canSubmit = !isValid || !isDirty || loading;

  const goToRegister = () => {
    router.push('/register');
  };

  const toggleSuccess = () => {
    setSuccess((prev) => !prev);
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
      <FormGroup>
        <FormControlLabel
          control={
            <Switch defaultChecked value={success} onChange={toggleSuccess} />
          }
          label="Fake API Call Success?"
        />
      </FormGroup>
    </Stack>
  );
}
