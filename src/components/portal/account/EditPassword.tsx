'use client';

import { Button, Grid, Stack, Typography } from '@mui/material';
import TextInput from '@src/components/sharedComponents/TextInput';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useChangePassword from '@src/api/account/changePassword';
import { useAppSelector } from '@src/hooks/reduxHook';
import { selectUserData } from '@src/redux/userSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

interface EditPasswordFormData {
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

const EditPassword: FC = () => {
  const [loading, setLoading] = useState(false);

  const userData = useAppSelector(selectUserData);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isValid }
  } = useForm<EditPasswordFormData>({
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
    resolver: yupResolver(schema)
  });

  const changePasswordMutation = useChangePassword();

  const onSubmitPersonalInfo = async (data: EditPasswordFormData) => {
    try {
      setLoading(true);

      if (!userData.id) return;

      await changePasswordMutation.mutateAsync({
        userId: userData.id,
        password: data.password
      });

      reset();
      toast.success('Đổi mật khẩu thành công!');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ERR_NETWORK') toast.error('Lỗi mạng!');
        else toast.error('Đổi mật khẩu thất bại!');
      } else {
        toast.error('Có lỗi xảy ra!');
      }
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !isDirty || !isValid || loading;

  return (
    <Stack
      component="form"
      spacing={2}
      onSubmit={handleSubmit(onSubmitPersonalInfo)}>
      <Typography component="p" variant="body1" fontWeight={600}>
        Mật khẩu
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextInput
            control={control}
            name="password"
            label="Mật khẩu mới"
            placeholder="Mật khẩu mới"
            errorMessage="Mật khẩu mới không được bỏ trống, phải là số, độ dài chuẩn (9 hoặc 12)"
            required
          />
        </Grid>
        <Grid item xs={9}></Grid>
        <Grid item xs={3}>
          <TextInput
            control={control}
            name="confirmPassword"
            label="Xác nhận lại mật khẩu"
            placeholder="Xác nhận lại mật khẩu"
            errorMessage="Mật khẩu xác nhận không được bỏ trống, phải là số, độ dài chuẩn (9 hoặc 12) và phải trùng mật khẩu thay đổi"
            required
          />
        </Grid>
        <Grid item xs={9}></Grid>
      </Grid>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" disabled={!isDirty} onClick={() => reset()}>
          Hủy bỏ
        </Button>
        <Button type="submit" variant="contained" disabled={isDisabled}>
          Lưu
        </Button>
      </Stack>
    </Stack>
  );
};

export default EditPassword;
