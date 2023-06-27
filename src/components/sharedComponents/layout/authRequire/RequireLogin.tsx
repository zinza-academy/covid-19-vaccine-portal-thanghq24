'use client';

import { getCookie } from 'cookies-next';
import { redirect } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'react-toastify';

const RequireLogin: FC<PropsWithChildren> = ({ children }) => {
  const accessToken = getCookie('access_token');

  if (!accessToken) {
    toast.warning('Vui lòng đăng nhập');
    redirect('/login');
  } else return <>{children}</>;
};

export default RequireLogin;
