'use client';

import React, { FC, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import DEFAULT_PAGINATION_VALUES from '@utils/constants/defaultPaginationValues';
import { VaccinationPointFindQueryType } from '@src/api/vaccinationPoint/find';
import VaccinationPointTable from '@src/components/admin/vaccination-point/VaccinationPointTable';
import { Box, Button, Stack } from '@mui/material';
import SearchSection from '@src/components/admin/vaccination-point/SearchSection';
import CreateModal from '@src/components/admin/vaccination-point/CreateModal';

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
  const [createModal, setCreateModalOpen] = useState<boolean>(false);

  const vaccinationPointForm = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between">
        <SearchSection vaccinationPointForm={vaccinationPointForm} />
        <Box>
          <Button variant="contained" onClick={handleOpenCreateModal}>
            Tạo mới
          </Button>
        </Box>
      </Stack>
      <VaccinationPointTable vaccinationPointForm={vaccinationPointForm} />
      <CreateModal
        createModalOpen={createModal}
        handleCloseCreateModal={handleCloseCreateModal}
        vaccinationPointForm={vaccinationPointForm}
      />
    </Stack>
  );
};

export default VaccinationPoint;
