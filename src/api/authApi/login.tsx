import { useMutation } from '@tanstack/react-query';
import api from '../axios';
import { FullRelationUserData, Role } from '@src/redux/userSlice';
import dayjs from 'dayjs';

interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginResponseType {
  accessToken: string;
  user: FullRelationUserData;
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
