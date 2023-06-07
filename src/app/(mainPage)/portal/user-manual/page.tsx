'use client';

import { Stack } from '@mui/material';
import DocumentTable from '@src/components/admin/document/DocumentTable';
import PageTitle from '@src/components/portal/PageTitle';
import React from 'react';

const UserManual = () => {
  return (
    <Stack spacing={4} py={4}>
      <PageTitle title="Tài liệu và hướng dẫn" />
      <DocumentTable readonly={true} />
    </Stack>
  );
};

export default UserManual;
