import api from '@src/api/axios';
import { useMutation } from '@tanstack/react-query';

export interface VaccinationPointEditFormData {
  name: string;
  address: string;
  ward: number | string;
  manager: string;
  tableNumber: number;
}

export interface VaccinationPointEditResponseType {
  name: string;
  address: string;
  ward: {
    id: number;
  };
  manager: string;
  tableNumber: number;
}

const editVaccinationPointApi = async (
  vaccinationPointEditFormData: VaccinationPointEditFormData
) => {
  const { data } = await api.post<VaccinationPointEditResponseType>(
    'vaccination-sites',
    vaccinationPointEditFormData
  );
  return data;
};

const useEditVaccinationPoint = () => {
  const editMutation = useMutation(
    (vaccinationPointEditFormData: VaccinationPointEditFormData) =>
      editVaccinationPointApi(vaccinationPointEditFormData)
  );

  return editMutation;
};

export default useEditVaccinationPoint;
