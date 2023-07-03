'use client';

import { Typography } from '@mui/material';
import useFindVaccineRegistration from '@src/api/vaccineRegistration/find';
import VaccinationRegistrationTable from '@src/components/portal/lookup-injection-registration/VaccinationRegistrationTable';
import { useAppSelector } from '@src/hooks/reduxHook';
import { selectUserData } from '@src/redux/userSlice';
import React, { FC } from 'react';

const LookupInjectionRegistration: FC = () => {
  const userData = useAppSelector(selectUserData);

  const { data } = useFindVaccineRegistration({
    page: 0,
    pageSize: 100,
    userId: userData.id,
    status: null,
    priorityType: null,
    appointmentDate: null
  });

  if (!data)
    return (
      <Typography variant="h6" textAlign="center">
        Loading
      </Typography>
    );

  return <VaccinationRegistrationTable vaccineRegistrationList={data.data} />;
};

export default LookupInjectionRegistration;
