import api from '../axios';
import { useQuery } from '@tanstack/react-query';
import {
  VaccineRegistrationFindOneResponseType,
  VaccineRegistrationFindOneParamsType
} from './types';

const findVaccineRegistrationApi = async (
  params: VaccineRegistrationFindOneParamsType
) => {
  const { data } = await api.get<VaccineRegistrationFindOneResponseType>(
    `vaccine-registrations/${params.id}`
  );
  return data;
};

const useFindOneVaccineRegistration = (
  params: VaccineRegistrationFindOneParamsType
) => {
  const findOneVaccineRegistrationQuery = useQuery({
    queryKey: ['vaccine-registrations', params],
    queryFn: () => findVaccineRegistrationApi(params),
    enabled: !!params.id
  });
  return findOneVaccineRegistrationQuery;
};

export default useFindOneVaccineRegistration;
