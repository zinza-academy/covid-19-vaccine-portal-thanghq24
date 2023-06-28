import { Divider, Paper, Typography } from '@mui/material';
import React, { FC } from 'react';
import SearchSection from './SearchSection';
import VaccinationPointTable from './VaccinationPointTable';
import { VaccinationPointFindQueryType } from '@src/api/vaccinationPoint/find';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import DEFAULT_PAGINATION_VALUES from '@utils/constants/defaultPaginationValues';

const schema = yup.object({
  page: yup.number().required(),
  pageSize: yup.number().required(),
  province: yup.string(),
  district: yup.string(),
  ward: yup.string(),
  name: yup.string(),
  address: yup.string()
});

const defaultValues: VaccinationPointFindQueryType = {
  page: DEFAULT_PAGINATION_VALUES.PAGE,
  pageSize: DEFAULT_PAGINATION_VALUES.PAGE_SIZE,
  ward: '',
  district: '',
  province: '',
  name: '',
  address: ''
};

const VaccinationPoint: FC = () => {
  const vaccinationPointForm = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  return (
    <Paper elevation={6} sx={{ padding: '24px 16px' }}>
      <Typography variant="h6">Tra cứu điểm tiêm theo địa bàn</Typography>
      <SearchSection vaccinationPointForm={vaccinationPointForm} />
      <Divider sx={{ pt: 2 }} />
      <VaccinationPointTable vaccinationPointForm={vaccinationPointForm} />
    </Paper>
  );
};

export default VaccinationPoint;
