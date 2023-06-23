import { useMutation } from '@tanstack/react-query';
import api from '../axios';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const resetPasswordMutation = useMutation(
    (variables: VariablesType) =>
      resetPasswordApi(variables.password, variables.token),
    {
      onSuccess: () => {
        toast.success('Đổi mật khẩu thành công!');
        router.push('/login');
      },
      onError: (err: AxiosError) => {
        if (err.code === 'ERR_NETWORK') toast.error('Lỗi mạng!');
        else toast.error('Đổi mật khẩu thất bại!');
      }
    }
  );

  return resetPasswordMutation;
};

export default useResetPassword;
