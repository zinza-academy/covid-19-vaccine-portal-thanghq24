import api from '../axios';
import { useQuery } from '@tanstack/react-query';
import {
  VaccineRegistrationResultFindOneResponseType,
  VaccineRegistrationResultFindOneParamsType
} from './types';

const findVaccineRegistrationResultApi = async (id: number) => {
  const { data } = await api.get<VaccineRegistrationResultFindOneResponseType>(
    `vaccine-registration-results/${id}`
  );
  return data;
};

const useFindOneVaccineRegistrationResult = (
  params: VaccineRegistrationResultFindOneParamsType
) => {
  const { id } = params;

  const findOneVaccineRegistrationResultQuery = useQuery({
    queryKey: ['vaccine-registration-results', { id }],
    queryFn: () => findVaccineRegistrationResultApi(id)
  });
  return findOneVaccineRegistrationResultQuery;
};

export default useFindOneVaccineRegistrationResult;
