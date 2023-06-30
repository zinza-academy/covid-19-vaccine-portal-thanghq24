import api from '../axios';
import { useQuery } from '@tanstack/react-query';
import {
  VaccineRegistrationFindResponseType,
  VaccineRegistrationFindParamsType
} from './types';

const findVaccineRegistrationApi = async (
  params: VaccineRegistrationFindParamsType
) => {
  const { data } = await api.get<VaccineRegistrationFindResponseType>(
    `vaccination-registrations`,
    {
      params: params
    }
  );
  return data;
};

const useFindVaccineRegistration = (
  params: VaccineRegistrationFindParamsType
) => {
  const findVaccineRegistrationQuery = useQuery({
    queryKey: ['vaccine-registrations', params],
    queryFn: () => findVaccineRegistrationApi(params)
  });
  return findVaccineRegistrationQuery;
};

export default useFindVaccineRegistration;
