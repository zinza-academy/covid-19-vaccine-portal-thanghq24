'use client';

import { Tab, Tabs, styled } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import React, { FC, useEffect } from 'react';

const tabs = [
  {
    label: 'Chứng nhận tiêm chủng',
    path: 'vaccine-certificate'
  },
  {
    label: 'Kết quả đăng ký',
    path: 'lookup-injection-registration'
  },
  {
    label: 'Tài khoản',
    path: 'account'
  }
];

const CustomTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: '#000'
  }
});

const CustomTab = styled(Tab)({
  textTransform: 'none',
  color: 'rgba(0, 0, 0, 0.7)',
  '&.Mui-selected': {
    color: '#000'
  },
  '& .MuiTabs-indicator': {
    backgroundColor: '#000'
  }
});

const PortalNavigation: FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [tab, setTab] = React.useState<number | null>(null);

  useEffect(() => {
    const getSelectedTab = () => {
      const paths = pathname.split('/');
      const selectedTab = tabs.findIndex(
        (tab) => tab.path === paths[paths.length - 1]
      );
      return selectedTab;
    };
    setTab(getSelectedTab);
  }, [pathname]);

  const handleClick = (path: string) => {
    router.push(`/portal/${path}`);
  };

  return (
    <CustomTabs value={tab}>
      {tabs.map((tab, index) => (
        <CustomTab
          key={index}
          label={tab.label}
          onClick={() => handleClick(tab.path)}
        />
      ))}
    </CustomTabs>
  );
};

export default PortalNavigation;
