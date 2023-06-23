import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import api from '../axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

export interface RegisterFormData {
  citizenIdentification: number | '';
  healthInsuranceNumber: string;
  email: string;
  password: string;
  fullName: string;
  dob: string | number | Date | dayjs.Dayjs | null | undefined;
  gender: string | null;
  province: string | number;
  district: string | number;
  ward: string | number;
  roles: number[];
}

interface RegisterResponseType {
  message: string;
}

const registerApi = async (registerFormData: RegisterFormData) => {
  const { data } = await api.post<RegisterResponseType>(
    '/auth/sign-up',
    registerFormData
  );
  return data;
};

const useRegister = () => {
  const router = useRouter();
  const registerMutation = useMutation(registerApi, {
    onSuccess: () => {
      toast.success('Đăng ký thành công');
      router.push('/login');
    },
    onError: (err: AxiosError) => {
      if (err.code === 'ERR_NETWORK') toast.error('Lỗi mạng!');
      else toast.error('Đăng ký thất bại!');
    }
  });
  return registerMutation;
};

export default useRegister;
