import React from 'react';
import api from '../axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export interface ForgotPasswordFormData {
  email: string;
}

interface ForgotPasswordResponseType {
  token: string;
}

const forgotPasswordApi = async (
  forgotPasswordFormData: ForgotPasswordFormData
) => {
  const { data } = await api.post<ForgotPasswordResponseType>(
    '/auth/forgot-password',
    forgotPasswordFormData
  );
  return data;
};

const useForgotPassword = () => {
  const forgotPasswordMutation = useMutation(
    (forgotPasswordFormData: ForgotPasswordFormData) =>
      forgotPasswordApi(forgotPasswordFormData),
    {
      onSuccess: () => {
        toast.success('Link đổi mật khẩu đã được gửi!');
      },
      onError: (err: AxiosError) => {
        if (err.code === 'ERR_NETWORK') toast.error('Lỗi mạng!');
        toast.error('Email không đúng!');
      }
    }
  );
  return forgotPasswordMutation;
};

export default useForgotPassword;
