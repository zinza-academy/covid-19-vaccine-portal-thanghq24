import { useMutation } from '@tanstack/react-query';
import api from '../axios';
import { Role } from '@src/redux/userSlice';
import dayjs from 'dayjs';

interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginResponseUserType {
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
}

export interface LoginResponseType {
  accessToken: string;
  user: LoginResponseUserType;
}

const loginApi = async (loginFormData: LoginFormData) => {
  const { data } = await api.post<LoginResponseType>(
    '/auth/login',
    loginFormData
  );
  return data;
};

const useLogin = () => {
  const loginMutation = useMutation((loginFormData: LoginFormData) =>
    loginApi(loginFormData)
  );
  return loginMutation;
};

export default useLogin;
