'use client';
import {
  Button,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  Typography
} from '@mui/material';
import { red } from '@mui/material/colors';
import TextInput from '@src/components/sharedComponents/TextInput';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';

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
  const [success, setSuccess] = useState(true);

  const onSubmit = (data: FormData) => {
    setLoading(true);
    setTimeout(() => {
      alert(
        success
          ? 'trying to log in with this data: ' +
              JSON.stringify({ email: data.email })
          : 'Có lỗi xảy ra'
      );
      setLoading(false);
      success ? router.push('/login') : null;
    }, 2000);
  };

  const canSubmit = !isValid || !isDirty || loading;

  const goToLogin = () => {
    router.push('/login');
  };

  const toggleSuccess = () => {
    setSuccess((prev) => !prev);
  };

  return (
    <Stack spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography px={5} align="center">
        Để khôi phục mật khẩu, vui lòng nhập đúng email bạn đã dùng để đăng ký{' '}
        <Typography component="span" display="inline" color={red[600]}>
          (*)
        </Typography>
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
};

export default ForgotPassword;
