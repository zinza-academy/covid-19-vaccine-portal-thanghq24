import { useMutation } from '@tanstack/react-query';
import api from '../axios';
import {
  VaccineRegistrationUpdateFormData,
  VaccineRegistrationUpdateResponseType
} from './types';

const updateVaccineRegistrationApi = async (
  id: number,
  vaccinationRegistrationUpdateFormData: VaccineRegistrationUpdateFormData
) => {
  const { data } = await api.patch<VaccineRegistrationUpdateResponseType>(
    'vaccine-registrations/' + id,
    vaccinationRegistrationUpdateFormData
  );
  return data;
};

const useUpdateVaccineRegistration = () => {
  const updateVaccineRegistrationMutation = useMutation(
    (variables: {
      id: number;
      vaccinationRegistrationUpdateFormData: VaccineRegistrationUpdateFormData;
    }) =>
      updateVaccineRegistrationApi(
        variables.id,
        variables.vaccinationRegistrationUpdateFormData
      )
  );
  return updateVaccineRegistrationMutation;
};

export default useUpdateVaccineRegistration;
