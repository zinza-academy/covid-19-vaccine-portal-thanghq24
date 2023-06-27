import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import api from '../axios';

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
  const registerMutation = useMutation(registerApi);
  return registerMutation;
};

export default useRegister;
