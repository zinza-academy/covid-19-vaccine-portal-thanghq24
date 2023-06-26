import api from '../axios';
import { useMutation } from '@tanstack/react-query';

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
      forgotPasswordApi(forgotPasswordFormData)
  );
  return forgotPasswordMutation;
};

export default useForgotPassword;
