import { Box, Button, Stack, Typography, alpha } from '@mui/material';
import React, { FC } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NavSubMenuItem from './NavSubMenuItem';
import {
  usePopupState,
  bindHover,
  bindPopover
} from 'material-ui-popup-state/hooks';
import HoverPopover from 'material-ui-popup-state/HoverPopover';
import BadgeIcon from '@mui/icons-material/Badge';
import LogoutIcon from '@mui/icons-material/Logout';
import EastIcon from '@mui/icons-material/East';
import { blue, green, indigo, orange } from '@mui/material/colors';
import { useAppDispatch, useAppSelector } from '@src/hooks/reduxHook';
import { logout, selectUserData } from '@src/redux/userSlice';
import Link from 'next/link';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import api from '@src/api/axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const AccountMenuItem: FC = () => {
  const router = useRouter();
  const userData = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'popover'
  });

  const handleLogout = async () => {
    dispatch(logout());
    await api.post('auth/logout');
    toast.warning('Đã đăng xuất');
    router.push('/');
  };

  return (
    <>
      {userData.fullName ? (
        <>
          <Button
            variant="text"
            sx={{ textTransform: 'none', color: 'white', fontWeight: 500 }}
            {...bindHover(popupState)}>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {userData.fullName}
            </Typography>
            <KeyboardArrowDownIcon sx={{ fontWeight: 500 }} />
          </Button>
          <HoverPopover
            {...bindPopover(popupState)}
            disableScrollLock={true}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}>
            <Box
              sx={{
                padding: '16px 0px',
                borderRadius: '12px'
              }}>
              <NavSubMenuItem
                label="Tài khoản"
                subLabel="Xem và chỉnh sửa thông tin tài khoản"
                url="/portal/account"
                icon={<BadgeIcon />}
                color={blue[600]}
              />
              <NavSubMenuItem
                label="Quản trị viên"
                subLabel="Thao tác quản trị viên"
                url="/admin/vaccination-registration"
                icon={<AdminPanelSettingsIcon />}
                color={green[600]}
              />
              <Box
                sx={{
                  padding: '6px 24px',
                  borderRadius: '12px',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    cursor: 'pointer'
                  }
                }}
                onClick={handleLogout}>
                <Stack
                  direction="row"
                  p={2}
                  width="100%"
                  justifyContent="space-between">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        display: 'flex',
                        padding: '6px',
                        backgroundColor: alpha(orange[600], 0.1),
                        borderRadius: '6px',
                        color: orange[600]
                      }}>
                      <LogoutIcon />
                    </Box>
                    <Stack>
                      <Typography variant="body1">Đăng xuất</Typography>
                      <Typography variant="body1" sx={{ fontSize: '14px' }}>
                        Đăng xuất khỏi hệ thống
                      </Typography>
                    </Stack>
                  </Stack>
                  <EastIcon sx={{ ml: 3, color: orange[600] }} />
                </Stack>
              </Box>
            </Box>
          </HoverPopover>
        </>
      ) : (
        <Link href="/login">
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
        </Link>
      )}
    </>
  );
};

export default AccountMenuItem;
