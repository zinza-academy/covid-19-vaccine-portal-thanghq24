import api from '@src/api/axios';
import { WardResponse } from '@src/hooks/useProvinces';
import { useQuery } from '@tanstack/react-query';

export interface VaccinationPointFindParamsType {
  id: number;
}

export interface VaccinationPointFindOneResponseType {
  id: number;
  name: string;
  address: string;
  manager: string;
  tableNumber: number;
  ward: WardResponse;
}

const findVaccinationPointApi = async (
  vaccinationPointFindQuery: VaccinationPointFindParamsType
) => {
  const { id } = vaccinationPointFindQuery;
  const { data } = await api.get<VaccinationPointFindOneResponseType>(
    `vaccination-sites/${id}`
  );
  return data;
};

const useFindOneVaccinationPoint = (
  vaccinationPointFindQuery: VaccinationPointFindParamsType
) => {
  const { id } = vaccinationPointFindQuery;

  const findOneQuery = useQuery({
    queryKey: ['vaccination-points', { id }],
    queryFn: () => findVaccinationPointApi(vaccinationPointFindQuery)
  });

  return findOneQuery;
};

export default useFindOneVaccinationPoint;
