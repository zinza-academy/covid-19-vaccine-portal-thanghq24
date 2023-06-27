import api from '@src/api/axios';
import { useQuery } from '@tanstack/react-query';
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
  const { page, pageSize, ward, district, province, name, address } =
    vaccinationPointFindQuery;
  const { data } = await api.get<VaccinationPointFindResponseType>(
    `vaccination-sites?page=${page}&pageSize=${pageSize}&ward=${ward}&district=${district}&province=${province}&name=${name}&address=${address}`
  );
  return data;
};

const useFindVaccinationPoint = (
  vaccinationPointFindQuery: VaccinationPointFindQueryType
) => {
  const { page, pageSize } = vaccinationPointFindQuery;

  const findQuery = useQuery({
    queryKey: ['vaccination-points', { page, pageSize }],
    queryFn: () => findVaccinationPointApi(vaccinationPointFindQuery),
    enabled: !!page || !!pageSize
  });

  return findQuery;
};

export default useFindVaccinationPoint;
