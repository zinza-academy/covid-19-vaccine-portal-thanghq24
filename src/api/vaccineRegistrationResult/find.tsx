import api from '../axios';
import { useQuery } from '@tanstack/react-query';
import { VaccineRegistrationFindResponseType } from '../vaccineRegistration/types';
import { VaccineRegistrationStatus } from '../vaccineRegistration/types';
import { CompletedVaccineRegistrationResultFindParamsType } from './types';

const findVaccineRegistrationApi = async (
  params: CompletedVaccineRegistrationResultFindParamsType
) => {
  const { data } = await api.get<VaccineRegistrationFindResponseType>(
    `vaccine-registrations`,
    {
      params: {
        userId: params.userId,
        status: VaccineRegistrationStatus.Completed,
        page: params.page,
        pageSize: params.pageSize
      }
    }
  );
  return data;
};

const useFindVaccineRegistration = (
  params: CompletedVaccineRegistrationResultFindParamsType
) => {
  const findVaccineRegistrationQuery = useQuery({
    queryKey: ['vaccine-registrations-completed', params],
    queryFn: () => findVaccineRegistrationApi(params)
  });
  return findVaccineRegistrationQuery;
};

export default useFindVaccineRegistration;
