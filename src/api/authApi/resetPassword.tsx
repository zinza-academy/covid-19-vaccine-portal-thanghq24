import { useMutation } from '@tanstack/react-query';
import api from '../axios';

interface VariablesType {
  password: string;
  token: string;
}

interface ResetPasswordResponseType {
  message: string;
}

interface VariablesType {
  password: string;
  token: string;
}

interface ResetPasswordResponseType {
  message: string;
}

const resetPasswordApi = async (password: string, token: string) => {
  const { data } = await api.post<ResetPasswordResponseType>(
    'auth/change-password/' + token,
    {
      password
    }
  );
  return data;
};

const useResetPassword = () => {
  const resetPasswordMutation = useMutation((variables: VariablesType) =>
    resetPasswordApi(variables.password, variables.token)
  );

  return resetPasswordMutation;
};

export default useResetPassword;
