import VaccinationRegistrationTable from '@src/components/portal/lookup-injection-registration/VaccinationRegistrationTable';
import dayjs from 'dayjs';
import React, { FC } from 'react';

export interface VaccinationRegistration {
  appointmentDate: string | number | Date | dayjs.Dayjs | null | undefined;
  dayPhase: number;
  status: 0 | 1;
}

const vaccineRegistrationList: Array<VaccinationRegistration> = [
  { appointmentDate: '01/04/2022', dayPhase: 0, status: 1 },
  { appointmentDate: '04/08/2022', dayPhase: 1, status: 0 },
  { appointmentDate: '05/01/2023', dayPhase: 2, status: 0 }
];

const LookupInjectionRegistration: FC = () => {
  return (
    <VaccinationRegistrationTable
      vaccineRegistrationList={vaccineRegistrationList}
    />
  );
};

export default LookupInjectionRegistration;
