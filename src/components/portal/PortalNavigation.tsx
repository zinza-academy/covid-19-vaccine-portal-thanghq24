'use client';

import { BorderBottom } from '@mui/icons-material';
import {
  Box,
  Divider,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  Typography,
  styled
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { FC, useEffect } from 'react';
import { forwardRef } from 'react';

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

  const [tab, setTab] = React.useState<number | null>(null);

  const getPath = () => {
    const paths = pathname.split('/');
    return paths[paths.length - 1];
  };

  useEffect(() => {
    const getSelectedTab = () => {
      const selectedTab = tabs.findIndex((tab) => tab.path === getPath());
      return selectedTab;
    };
    setTab(getSelectedTab);
  }, [pathname]);

  return (
    <Stack direction="row">
      {tabs.map((t, index) => (
        // <Link key={index} href={`/portal/${tab.path}`} passHref>
        //   <CustomTab label={tab.label} />
        // </Link>
        <Link
          key={index}
          href={`/portal/${t.path}`}
          passHref
          style={{
            color: t.path === getPath() ? '#000' : 'rgba(0, 0, 0, 0.6)',
            borderBottom: t.path === getPath() ? '2px solid #000' : '0'
          }}>
          <Stack
            sx={{
              height: '48px',
              justifyContent: 'center',
              padding: '0 16px'
            }}>
            {t.label}
          </Stack>
        </Link>
      ))}
    </Stack>
  );
};

export default PortalNavigation;
