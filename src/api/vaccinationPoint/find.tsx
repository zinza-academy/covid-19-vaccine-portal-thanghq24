import api from '@src/api/axios';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { VaccinationPointFindOneResponseType } from './findOne';

export interface VaccinationPointFindQueryType {
  page: number;
  pageSize: number;
  ward: string | number;
  district: string | number;
  province: string | number;
  name: string | '' | null;
  address: string | '' | null;
}

export interface VaccinationPointFindResponseType {
  data: VaccinationPointFindOneResponseType[];
  page: number;
  pageSize: number;
  count: number;
}

const findVaccinationPointApi = async (
  vaccinationPointFindQuery: VaccinationPointFindQueryType
) => {
  const { data } = await api.get<VaccinationPointFindResponseType>(
    'vaccination-sites',
    {
      params: vaccinationPointFindQuery
    }
  );
  return data;
};

const useFindVaccinationPoint = (
  vaccinationPointFindQuery: VaccinationPointFindQueryType
) => {
  const findQuery = useQuery({
    queryKey: ['vaccination-points', vaccinationPointFindQuery],
    queryFn: () => findVaccinationPointApi(vaccinationPointFindQuery)
  });

  return findQuery;
};

export default useFindVaccinationPoint;
