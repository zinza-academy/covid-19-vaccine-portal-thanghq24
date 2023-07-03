import api from '../axios';
import { useQuery } from '@tanstack/react-query';
import {
  VaccineRegistrationFindOneResponseType,
  VaccineRegistrationFindOneParamsType
} from './types';

const findVaccineRegistrationApi = async (id: number) => {
  const { data } = await api.get<VaccineRegistrationFindOneResponseType>(
    `vaccine-registrations/${id}`
  );
  return data;
};

const useFindOneVaccineRegistration = (
  params: VaccineRegistrationFindOneParamsType
) => {
  const { id } = params;

  const findOneVaccineRegistrationQuery = useQuery({
    queryKey: ['vaccine-registrations', { id }],
    queryFn: () => findVaccineRegistrationApi(id)
  });
  return findOneVaccineRegistrationQuery;
};

export default useFindOneVaccineRegistration;
