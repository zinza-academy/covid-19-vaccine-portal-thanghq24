'use client';

import { useAppDispatch } from '@src/hooks/reduxHook';
import { logout } from '@src/redux/userSlice';
import { getCookie } from 'cookies-next';
import { redirect } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'react-toastify';

const RequireLogin: FC<PropsWithChildren> = ({ children }) => {
  const accessToken = getCookie('access_token');

  const dispatch = useAppDispatch();

  if (!accessToken) {
    toast.warning('Vui lòng đăng nhập');
    dispatch(logout);
    redirect('/login');
  } else return <>{children}</>;
};

export default RequireLogin;
