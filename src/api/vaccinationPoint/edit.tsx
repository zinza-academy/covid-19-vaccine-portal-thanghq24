import api from '@src/api/axios';
import { useMutation } from '@tanstack/react-query';
import { VaccinationPointFindOneResponseType } from './findOne';

export interface VaccinationPointEditFormData {
  name: string;
  address: string;
  ward: number | string;
  manager: string;
  tableNumber: number;
}

export interface VaccinationPointEditResponseType
  extends VaccinationPointFindOneResponseType {}

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
