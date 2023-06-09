'use client';

import React, { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import VaccinationRegistrationTable from '@src/components/admin/vaccination-registration/VaccinationRegistrationTable';
import dayjs from 'dayjs';
import SelectInput from '@src/components/sharedComponents/SelectInput';
import DateInput from '@src/components/sharedComponents/DateInput';
import priorityType from '@src/utils/constants/priorityType';

interface SearchFormData {
  priorityType: number | '';
  appointmentDate: string | number | Date | dayjs.Dayjs | null | undefined;
}

const schema = yup.object().shape({
  priorityType: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? null : originalValue;
    })
    .nullable(),
  appointmentDate: yup.date().nullable()
});

const VaccinationRegistration: FC = () => {
  const { control, handleSubmit } = useForm<SearchFormData>({
    mode: 'onChange',
    defaultValues: {
      priorityType: '',
      appointmentDate: null
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: SearchFormData) => {
    alert('try to search with ' + JSON.stringify(data));
  };

  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" spacing={2}>
        <Box sx={{ width: '260px' }}>
          <SelectInput
            name="priorityType"
            control={control}
            placeholder="Nhóm ưu tiên"
            selections={priorityType}
            size="small"
          />
        </Box>
        <Box sx={{ width: '260px' }}>
          <DateInput
            control={control}
            name="appointmentDate"
            placeholder="Ngày/Tháng/Năm"
            size="small"
          />
        </Box>
        <Button type="submit" variant="contained">
          Tìm kiếm
        </Button>
      </Stack>
      <VaccinationRegistrationTable />
    </Stack>
  );
};

export default VaccinationRegistration;
