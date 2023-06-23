import { useMutation } from '@tanstack/react-query';
import api from '../axios';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@src/hooks/reduxHook';
import { AxiosError } from 'axios';
import { login } from '@src/redux/userSlice';
import { useRouter } from 'next/navigation';

interface LoginFormData {
  email: string;
  password: string;
}

const loginApi = async (loginFormData: LoginFormData) => {
  const { data } = await api.post('/auth/login', loginFormData);
  return data;
};

const useLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loginMutation = useMutation(
    (loginFormData: LoginFormData) => loginApi(loginFormData),
    {
      onSuccess: (data) => {
        toast.success('Đăng nhập thành công!');
        console.log(data.user);
        dispatch(login(data.user));
        router.push('/');
      },
      onError: (err: AxiosError) => {
        if (err.code === 'ERR_NETWORK') toast.error('Lỗi mạng!');
        else toast.error('Đăng nhập thất bại!');
      }
    }
  );
  return loginMutation;
};

export default useLogin;
