'use client';

import { Stack } from '@mui/material';
import AdminNavigation from '@src/components/admin/AdminNavigation';
import React, { FC, PropsWithChildren } from 'react';

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack spacing={2} mb={2}>
      <AdminNavigation />
      {children}
    </Stack>
  );
};

export default AdminLayout;
