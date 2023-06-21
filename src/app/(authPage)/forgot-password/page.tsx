'use client';
import { Button, Stack, Typography } from '@mui/material';
import TextInput from '@src/components/sharedComponents/TextInput';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import RequiredTag from '@src/components/sharedComponents/RequiredTag';
import fetchAPI from '@src/utils/fetchAPI';
import { toast } from 'react-toastify';
interface FormData {
  email: string;
}
const schema = yup
  .object()
  .shape({
    email: yup.string().email().required()
  })
  .required();

const defaultValues = {
  email: ''
};

const ForgotPassword: FC = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid }
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema)
  });

  const [loading, setLoading] = useState(false);

  const obSubmit = async (data: FormData) => {
    setLoading(true);

    await fetchAPI('auth/forgot-password', 'POST', { email: data.email })
      .then((response) => {
        toast.success('Link đổi mật khẩu đã được gửi!');
        router.push('/reset-password/' + response.data.token);
      })
      .catch((error) => {
        toast.error('Email không đúng!');
      });

    setLoading(false);
  };

  const canSubmit = !isValid || !isDirty || loading;

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <Stack spacing={3} component="form" onSubmit={handleSubmit(obSubmit)}>
      <Typography px={5} align="center">
        Để khôi phục mật khẩu, vui lòng nhập đúng email bạn đã dùng để đăng ký{' '}
        <RequiredTag />
      </Typography>
      <TextInput
        control={control}
        name="email"
        placeholder="Email"
        errorMessage="Email không được bỏ trống và phải đúng định dạng"
      />
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={goToLogin}>
          Quay lại
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          disabled={canSubmit}
          sx={{
            padding: '6px 32px'
          }}>
          Gửi
        </Button>
      </Stack>
    </Stack>
  );
};

export default ForgotPassword;
