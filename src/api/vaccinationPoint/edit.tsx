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
  id: number | undefined,
  vaccinationPointEditFormData: VaccinationPointEditFormData
) => {
  const { data } = await api.patch<VaccinationPointEditResponseType>(
    'vaccination-sites/' + id,
    vaccinationPointEditFormData
  );
  return data;
};

const useEditVaccinationPoint = () => {
  const editMutation = useMutation(
    (variables: {
      id: number | undefined;
      vaccinationPointEditFormData: VaccinationPointEditFormData;
    }) =>
      editVaccinationPointApi(
        variables.id,
        variables.vaccinationPointEditFormData
      )
  );

  return editMutation;
};

export default useEditVaccinationPoint;
