import api from '../axios';
import { useQuery } from '@tanstack/react-query';
import {
  VaccineRegistrationResultFindResponseType,
  VaccineRegistrationResultFindParamsType
} from './types';
import { STATUS } from '../vaccineRegistration/types';

const findVaccineRegistrationResultApi = async (
  params: VaccineRegistrationResultFindParamsType
) => {
  const { data } = await api.get<VaccineRegistrationResultFindResponseType>(
    `vaccination-registration-results`,
    {
      params: {
        userId: params.userId,
        status: STATUS.COMPLETED
      }
    }
  );
  return data;
};

const useFindVaccineRegistrationResult = (
  params: VaccineRegistrationResultFindParamsType
) => {
  const findVaccineRegistrationResultQuery = useQuery({
    queryKey: ['vaccine-registration-results', params],
    queryFn: () => findVaccineRegistrationResultApi(params)
  });
  return findVaccineRegistrationResultQuery;
};

export default useFindVaccineRegistrationResult;
