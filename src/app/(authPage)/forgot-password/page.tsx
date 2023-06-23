'use client';
import { Button, Stack, Typography } from '@mui/material';
import TextInput from '@src/components/sharedComponents/TextInput';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import RequiredTag from '@src/components/sharedComponents/RequiredTag';
import useForgotPassword, {
  ForgotPasswordFormData
} from '@src/api/authApi/forgotPassword';
import { toast } from 'react-toastify';
import axios from 'axios';

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

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid }
  } = useForm<ForgotPasswordFormData>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema)
  });

  const forgotPasswordMutation = useForgotPassword();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setLoading(true);
      await forgotPasswordMutation.mutateAsync(data);
      toast.success('Link đổi mật khẩu đã được gửi!');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ERR_NETWORK') toast.error('Lỗi mạng!');
        else if (error?.response?.status === 404)
          toast.error('Không tìm thấy user với email này!');
        else toast.error('Không thể gửi link reset mật khẩu!');
      } else {
        toast.error('Có lỗi xảy ra!');
      }
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = !isValid || !isDirty || forgotPasswordMutation.isLoading;

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <Stack spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
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
