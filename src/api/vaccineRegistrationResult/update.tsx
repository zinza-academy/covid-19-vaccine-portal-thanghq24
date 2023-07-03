import { useMutation } from '@tanstack/react-query';
import api from '../axios';
import {
  VaccineRegistrationResultUpdateFormData,
  VaccineRegistrationResultUpdateResponseType
} from './types';

const updateVaccineRegistrationResultApi = async (
  id: number,
  vaccinationRegistrationResultUpdateFormData: VaccineRegistrationResultUpdateFormData
) => {
  const { data } = await api.patch<VaccineRegistrationResultUpdateResponseType>(
    'vaccine-registration-results/' + id,
    vaccinationRegistrationResultUpdateFormData
  );
  return data;
};

const useUpdateVaccineRegistrationResult = () => {
  const updateVaccineRegistrationResultMutation = useMutation(
    (variables: {
      id: number;
      vaccinationRegistrationResultUpdateFormData: VaccineRegistrationResultUpdateFormData;
    }) =>
      updateVaccineRegistrationResultApi(
        variables.id,
        variables.vaccinationRegistrationResultUpdateFormData
      )
  );
  return updateVaccineRegistrationResultMutation;
};

export default useUpdateVaccineRegistrationResult;
