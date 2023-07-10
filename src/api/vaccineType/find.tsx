import api from '../axios';
import { useQuery } from '@tanstack/react-query';

export interface VaccineTypeFindOneResponseType {
  id: number;
  name: string;
  batchNumber: string;
}

const findVaccineTypeApi = async () => {
  const { data } = await api.get<VaccineTypeFindOneResponseType[]>(
    `vaccine-types`
  );
  return data;
};

const useFindVaccineType = () => {
  const findVaccineTypeQuery = useQuery({
    queryKey: ['vaccine-types'],
    queryFn: () => findVaccineTypeApi()
  });
  return findVaccineTypeQuery;
};

export default useFindVaccineType;
