import { useMutation } from '@tanstack/react-query';
import api from '../axios';
import {
  VaccineRegistrationCreateFormData,
  VaccineRegistrationCreateResponseType
} from './types';

const createVaccineRegistrationApi = async (
  vaccinationRegistrationCreateFormData: VaccineRegistrationCreateFormData
) => {
  const { data } = await api.post<VaccineRegistrationCreateResponseType>(
    'vaccine-registrations',
    vaccinationRegistrationCreateFormData
  );
  return data;
};

const useCreateVaccineRegistration = () => {
  const createVaccineRegistrationMutation = useMutation(
    (
      vaccinationRegistrationCreateFormData: VaccineRegistrationCreateFormData
    ) => createVaccineRegistrationApi(vaccinationRegistrationCreateFormData)
  );
  return createVaccineRegistrationMutation;
};

export default useCreateVaccineRegistration;
