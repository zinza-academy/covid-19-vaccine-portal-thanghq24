import ClientSideLayout from '@src/components/sharedComponents/layout/ClientSideLayout';
import React, { FC, PropsWithChildren } from 'react';

const MainPageLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ClientSideLayout>{children}</ClientSideLayout>
    </>
  );
};

export default MainPageLayout;
