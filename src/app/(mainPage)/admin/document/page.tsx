'use client';

import { Button, Stack } from '@mui/material';
import CreateModal from '@src/components/admin/document/CreateModal';
import DocumentTable from '@src/components/admin/document/DocumentTable';
import React, { FC, useState } from 'react';

const Document: FC = () => {
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };
  return (
    <Stack spacing={2}>
      <Stack alignItems="end">
        <Button variant="contained" onClick={handleOpenCreateModal}>
          Thêm mới
        </Button>
        <CreateModal
          handleCloseCreateModal={handleCloseCreateModal}
          createModalOpen={createModalOpen}
        />
      </Stack>
      <DocumentTable />
    </Stack>
  );
};

export default Document;
