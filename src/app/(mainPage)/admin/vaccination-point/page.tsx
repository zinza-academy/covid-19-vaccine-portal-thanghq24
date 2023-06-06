'use client';

import React, { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import TextInput from '@src/components/sharedComponents/TextInput';
import VaccinationPointTable from '@src/components/admin/vaccination-point/VaccinationPointTable';

interface SearchFormData {
  name: string;
  address: string;
}

const schema = yup
  .object()
  .shape({
    vaccinationPoint: yup.string(),
    address: yup.string()
  })
  .required();

const VaccinationPoint: FC = () => {
  const {
    control,
    handleSubmit,
    formState: {}
  } = useForm<SearchFormData>({
    defaultValues: {
      name: '',
      address: ''
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: SearchFormData) => {};

  return (
    <Stack spacing={2}>
      <Stack
        spacing={2}
        direction="row"
        alignItems="end"
        component="form"
        onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          control={control}
          name="name"
          placeholder="Điểm tiêm"
          size="small"
        />
        <TextInput
          control={control}
          name="address"
          placeholder="Địa chỉ"
          required
          size="small"
        />
        <Button type="submit" variant="contained">
          Tìm kiếm
        </Button>
      </Stack>
      <VaccinationPointTable />
    </Stack>
  );
};

export default VaccinationPoint;
