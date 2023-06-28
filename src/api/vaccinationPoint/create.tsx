import api from '@src/api/axios';
import { useMutation } from '@tanstack/react-query';
import { VaccinationPointFindOneResponseType } from './findOne';

export interface VaccinationPointCreateFormData {
  name: string;
  address: string;
  ward: number | string;
  manager: string;
  tableNumber: number;
}

export interface VaccinationPointCreateResponseType
  extends VaccinationPointFindOneResponseType {}

const createVaccinationPointApi = async (
  vaccinationPointCreateFormData: VaccinationPointCreateFormData
) => {
  const { data } = await api.post<VaccinationPointCreateResponseType>(
    'vaccination-sites',
    vaccinationPointCreateFormData
  );
  return data;
};

const useCreateVaccinationPoint = () => {
  const createMutation = useMutation(
    (vaccinationPointCreateFormData: VaccinationPointCreateFormData) =>
      createVaccinationPointApi(vaccinationPointCreateFormData)
  );

  return createMutation;
};

export default useCreateVaccinationPoint;
