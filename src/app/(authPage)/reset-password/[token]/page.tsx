'use client';

import { Button, Stack, Typography } from '@mui/material';
import TextInput from '@src/components/sharedComponents/TextInput';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter, useParams } from 'next/navigation';
import fetchAPI from '@src/utils/fetchAPI';
import { toast } from 'react-toastify';
import RequiredTag from '@src/components/sharedComponents/RequiredTag';

interface FormData {
  password: string;
  confirmPassword: string;
}
const schema = yup
  .object()
  .shape({
    password: yup.string().trim().min(8).required(),
    confirmPassword: yup
      .string()
      .trim()
      .min(8)
      .required()
      .oneOf(
        [yup.ref('password')],
        'Mật khẩu xác phải trùng mật khẩu thay đổi '
      )
  })
  .required();

const defaultValues = {
  password: '',
  confirmPassword: ''
};

const ResetPassword: FC = () => {
  const router = useRouter();
  const params = useParams();

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

  const goToLogin = () => {
    router.push('/login');
  };

  const obSubmit = async (data: FormData) => {
    setLoading(true);

    await fetchAPI(`auth/change-password/${params.token}`, 'POST', {
      password: data.password
    })
      .then((response) => {
        toast.success('Đổi mật khẩu thành công!');
        goToLogin();
      })
      .catch((error) => {
        console.log(error);
        toast.error('Có lỗi xảy ra hoặc yêu cầu đổi mật khẩu đã hết hạn!');
      });

    setLoading(false);
  };

  const canSubmit = !isValid || !isDirty || loading;

  return (
    <Stack spacing={3} component="form" onSubmit={handleSubmit(obSubmit)}>
      <Typography px={5} align="center">
        Để khôi phục mật khẩu, vui lòng nhập đúng email bạn đã dùng để đăng ký{' '}
        <RequiredTag />
      </Typography>
      <TextInput
        control={control}
        name="password"
        label="Mật khẩu mới"
        placeholder="Mật khẩu mới"
        errorMessage="Mật khẩu mới không được bỏ trống, phải là số, độ dài chuẩn (9 hoặc 12)"
        type="password"
        required
      />
      <TextInput
        control={control}
        name="confirmPassword"
        label="Xác nhận lại mật khẩu"
        placeholder="Xác nhận lại mật khẩu"
        errorMessage="Mật khẩu xác nhận không được bỏ trống, phải là số, độ dài chuẩn (9 hoặc 12) và phải trùng mật khẩu thay đổi"
        type="password"
        required
      />
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={goToLogin}>
          Đăng nhập
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
          Đổi mật khẩu
        </Button>
      </Stack>
    </Stack>
  );
};

export default ResetPassword;
