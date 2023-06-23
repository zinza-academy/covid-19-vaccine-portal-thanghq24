'use client';

import { Stack } from '@mui/material';
import AdminNavigation from '@src/components/admin/AdminNavigation';
import RequireAdmin from '@src/components/sharedComponents/layout/authRequire/RequireAdmin';
import RequireLogin from '@src/components/sharedComponents/layout/authRequire/RequireLogin';
import React, { FC, PropsWithChildren } from 'react';

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <RequireLogin>
      <RequireAdmin>
        <Stack spacing={2} mb={2}>
          <AdminNavigation />
          {children}
        </Stack>
      </RequireAdmin>
    </RequireLogin>
  );
};

export default AdminLayout;
