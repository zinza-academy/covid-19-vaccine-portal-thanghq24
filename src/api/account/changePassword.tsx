import { useMutation } from '@tanstack/react-query';
import api from '../axios';
import { FullRelationUserData } from '@src/redux/userSlice';

interface ChangePasswordRequestType {
  password: string;
  userId: number;
}

const changePasswordApi = async (userId: number, password: string) => {
  const { data } = await api.patch<FullRelationUserData>(
    'users/edit-password/' + userId,
    { password: password }
  );
  return data;
};

const useChangePassword = () => {
  return useMutation((variables: ChangePasswordRequestType) =>
    changePasswordApi(variables.userId, variables.password)
  );
};

export default useChangePassword;
