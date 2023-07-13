import { useMutation } from '@tanstack/react-query';
import api from '../axios';
import dayjs from 'dayjs';
import { FullRelationUserData } from '@src/redux/userSlice';

export interface EditAccountFormDataType {
  fullName: string;
  email: string;
  healthInsuranceNumber: string;
  dob: string | number | Date | dayjs.Dayjs | null | undefined;
  gender: string;
  citizenIdentification: string | number;
  ward: number | string;
}

const editAccountApi = async (
  userId: number,
  formData: EditAccountFormDataType
) => {
  const { data } = await api.patch<FullRelationUserData>(
    'users/' + userId,
    formData
  );
  return data;
};

const useEditAccount = () => {
  return useMutation(
    (variables: { userId: number; formData: EditAccountFormDataType }) =>
      editAccountApi(variables.userId, variables.formData)
  );
};

export default useEditAccount;
