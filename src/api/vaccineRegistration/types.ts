import { FullRelationUserData } from '@src/redux/userSlice';
import dayjs from 'dayjs';

export enum STATUS {
  REQUESTED = 'REQUESTED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED'
}

export interface VaccineRegistrationResult {
  id: number;
  injectingTime: string | number | Date | dayjs.Dayjs | null | undefined;
  vaccinationSite: VaccinationSite;
  vaccineType: VaccineType;
}

export interface VaccinationSite {
  id: number;
  name: string;
  address: string;
  manager: string;
  tableNumber: number;
}

export interface VaccineType {
  id: number;
  name: string;
  batchNumber: string;
}

export interface VaccineRegistrationFindOneParamsType {
  id: number | null;
}

export interface VaccineRegistrationFindParamsType {
  userId: number | null;
  page: number;
  pageSize: number;
  priorityType: number | string | null;
  appointmentDate: string | number | Date | dayjs.Dayjs | null | undefined;
  status: STATUS | null;
}

export interface VaccineRegistrationCreateFormData
  extends VaccineRegistrationUpdateFormData {
  user: number;
}

export interface VaccineRegistrationUpdateFormData {
  priorityType: number | '';
  job: string;
  workplace: string;
  address: string;
  appointmentDate: string | number | Date | dayjs.Dayjs | null | undefined;
  dayPhase: string;
}

export interface VaccineRegistrationDecideApprovalFormData {
  status: STATUS;
}

export interface VaccineRegistrationFindOneResponseType {
  id: number;
  status: STATUS;
  priorityType: number;
  job: number;
  workplace: string;
  address: string;
  appointmentDate: string | number | Date | dayjs.Dayjs | null | undefined;
  dayPhase: number;
  user: FullRelationUserData;
  vaccineRegistrationResult: VaccineRegistrationResult | null;
}

export interface VaccineRegistrationFindResponseType {
  data: VaccineRegistrationFindOneResponseType[];
  page: number;
  pageSize: number;
  count: number;
}

export interface VaccineRegistrationCreateResponseType
  extends Omit<
    VaccineRegistrationFindOneResponseType,
    'vaccineRegistrationResult'
  > {
  vaccineRegistrationResult: null;
}

export interface VaccineRegistrationUpdateResponseType
  extends VaccineRegistrationFindOneResponseType {}

export interface VaccineRegistrationDecideApprovalResponseType
  extends VaccineRegistrationFindOneResponseType {}
