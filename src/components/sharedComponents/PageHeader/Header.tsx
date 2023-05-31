import {
  AppBar,
  Box,
  Button,
  MenuItem,
  Stack,
  Typography
} from '@mui/material';
import Image from 'next/image';
import React, { FC } from 'react';
import LogoImage from '@public/images/logo.png';
import NavMenuItem from './NavMenuItem';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { blue, indigo, purple } from '@mui/material/colors';

const Header: FC = () => {
  return (
    <AppBar
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: 4,
        py: '15px',
        background:
          'linear-gradient(90deg, #ED1B23 0%, #2E3091 52.08%, #253494 100%, #253494 100%)'
      }}>
      <Stack
        width="100%"
        direction="row"
        justifyContent="space-between"
        alignItems="center">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Image src={LogoImage} alt="Logo" width={42} height={50} />
          <Typography variant="h6" textTransform="uppercase">
            Cổng thông tin tiêm chủng covid-19
          </Typography>
        </Stack>
        <Stack direction="row">
          <NavMenuItem label="Trang chủ" url="/" />
          <NavMenuItem label="Đăng ký tiêm" url="/register-for-vaccinations" />
          <NavMenuItem
            label="Tra cứu"
            subMenuItems={[
              {
                label: 'Tra cứu chứng nhận tiêm',
                subLabel: 'Cập nhật nhanh và chính xác nhất',
                url: '/portal/search',
                icon: <PeopleAltIcon />,
                color: purple[600]
              },
              {
                label: 'Tra cứu kết quả đăng ký',
                subLabel: 'Cập nhật nhanh và chính xác nhất',
                url: '/portal/lookup-injection-registration',
                icon: <PeopleAltIcon />,
                color: blue[600]
              }
            ]}
          />
          <NavMenuItem label="Tài liệu" url="/user-manual" />
          <Button
            variant="outlined"
            size="large"
            sx={{
              backgroundColor: '#fff',
              '&:hover': {
                backgroundColor: indigo[600],
                borderColor: '#fff',
                color: '#fff'
              }
            }}>
            Đăng nhập
          </Button>
        </Stack>
      </Stack>
    </AppBar>
  );
};

export default Header;
