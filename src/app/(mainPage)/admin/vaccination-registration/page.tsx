'use client';

import React, { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import VaccinationRegistrationTable from '@src/components/admin/vaccination-registration/VaccinationRegistrationTable';
import DEFAULT_PAGINATION_VALUES from '@src/utils/constants/defaultPaginationValues';
import { VaccineRegistrationFindParamsType } from '@src/api/vaccineRegistration/types';
import SearchSection from '@src/components/admin/vaccination-registration/SearchSection';

const schema = yup.object({
  page: yup.number().required(),
  pageSize: yup.number().required(),
  priorityType: yup.number().nullable(),
  appointmentDate: yup.date().nullable()
});

const defaultValues: VaccineRegistrationFindParamsType = {
  page: DEFAULT_PAGINATION_VALUES.PAGE,
  pageSize: DEFAULT_PAGINATION_VALUES.PAGE_SIZE,
  appointmentDate: null,
  priorityType: null,
  status: null,
  userId: null
};

const VaccinationRegistration: FC = () => {
  const vaccineRegistrationForm = useForm<VaccineRegistrationFindParamsType>({
    mode: 'onChange',
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  });

  return (
    <Stack spacing={2}>
      <SearchSection vaccineRegistrationForm={vaccineRegistrationForm} />
      <VaccinationRegistrationTable
        vaccineRegistrationForm={vaccineRegistrationForm}
      />
    </Stack>
  );
};

export default VaccinationRegistration;
