'use client';

import { Stack } from '@mui/material';
import EditPassword from '@src/components/portal/account/EditPassword';
import EditPersonalInfo from '@src/components/portal/account/EditPersonalInfo';
import { FC } from 'react';

const Account: FC = () => {
  return (
    <Stack spacing={2}>
      <EditPersonalInfo />
      <EditPassword />
    </Stack>
  );
};

export default Account;
