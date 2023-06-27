import RequireLogin from '@src/components/sharedComponents/layout/authRequire/RequireLogin';
import React, { FC, PropsWithChildren } from 'react';

const PortalLayout: FC<PropsWithChildren> = ({ children }) => {
  return <RequireLogin>{children}</RequireLogin>;
};

export default PortalLayout;
