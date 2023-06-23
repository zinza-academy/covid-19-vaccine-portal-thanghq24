import { useMutation } from '@tanstack/react-query';
import api from '../axios';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@src/hooks/reduxHook';
import { AxiosError } from 'axios';
import { Role, UserData, login } from '@src/redux/userSlice';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginResponseType {
  accessToken: string;
  user: {
    id: number;
    fullName: string;
    email: string;
    healthInsuranceNumber: string;
    dob: string | number | Date | dayjs.Dayjs | null | undefined;
    gender: string;
    citizenIdentification: string;
    roles: Role[];
    ward: number | string;
    district: number | string;
    province: number | string;
  };
}

const loginApi = async (loginFormData: LoginFormData) => {
  const { data } = await api.post<LoginResponseType>(
    '/auth/login',
    loginFormData
  );
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
