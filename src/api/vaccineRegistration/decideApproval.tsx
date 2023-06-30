import { useMutation } from '@tanstack/react-query';
import api from '../axios';
import {
  VaccineRegistrationDecideApprovalFormData,
  VaccineRegistrationDecideApprovalResponseType
} from './types';

const decideApprovalVaccineRegistrationApi = async (
  id: number,
  vaccinationRegistrationDecideApprovalFormData: VaccineRegistrationDecideApprovalFormData
) => {
  const { data } =
    await api.patch<VaccineRegistrationDecideApprovalResponseType>(
      'vaccination-registrations/' + id,
      vaccinationRegistrationDecideApprovalFormData
    );
  return data;
};

const useDecideApprovalVaccineRegistration = () => {
  const decideApprovalVaccineRegistrationMutation = useMutation(
    (variables: {
      id: number;
      vaccinationRegistrationDecideApprovalFormData: VaccineRegistrationDecideApprovalFormData;
    }) =>
      decideApprovalVaccineRegistrationApi(
        variables.id,
        variables.vaccinationRegistrationDecideApprovalFormData
      )
  );
  return decideApprovalVaccineRegistrationMutation;
};

export default useDecideApprovalVaccineRegistration;
