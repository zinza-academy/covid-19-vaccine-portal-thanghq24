import dayjs from 'dayjs';
import { VaccinationPointFindOneResponseType } from '../vaccinationPoint/findOne';

export interface VaccinationSite {
  id: number;
  name: string;
  address: string;
  manager: string;
  tableNumber: number;
}

export interface VaccineRegistration {
  id: number;
  status: string;
  priorityType: number;
  job: number;
  workplace: string;
  address: string;
  appointmentDate: string | number | Date | dayjs.Dayjs | null | undefined;
  dayPhase: number;
}

export interface VaccineType {
  id: number;
  name: string;
  batchNumber: string;
}

export interface VaccineRegistrationResultFindOneParamsType {
  id: number | null;
}

export interface VaccineRegistrationResultFindParamsType {
  userId: number | null;
}

export interface CompletedVaccineRegistrationResultFindParamsType
  extends VaccineRegistrationResultFindParamsType {
  page: number;
  pageSize: number;
}

export interface VaccineRegistrationResultUpdateFormData {
  injectingTime: string | number | Date | dayjs.Dayjs | null | undefined;
  vaccinationSite: number;
  vaccineType: number;
}

export interface VaccineRegistrationResultFindOneResponseType {
  id: number;
  injectingTime: string | number | Date | dayjs.Dayjs | null | undefined;
  vaccinationSite: VaccinationSite | null;
  vaccineRegistration: VaccineRegistration;
  vaccineType: VaccineType | null;
}

export interface VaccineRegistrationResultFindResponseType {
  data: VaccineRegistrationResultFindOneResponseType[];
  page: number;
  pageSize: number;
  count: number;
}

export interface VaccineRegistrationResultUpdateResponseType
  extends VaccinationPointFindOneResponseType {}
