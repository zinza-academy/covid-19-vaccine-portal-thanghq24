'use client';

import { Stack } from '@mui/material';
import PortalNavigation from '@src/components/portal/PortalNavigation';
import React, { FC, PropsWithChildren } from 'react';

const AccountLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack spacing={2} mb={2}>
      <PortalNavigation />
      {children}
    </Stack>
  );
};

export default AccountLayout;
