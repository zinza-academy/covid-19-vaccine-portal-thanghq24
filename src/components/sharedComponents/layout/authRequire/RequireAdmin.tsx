import { useAppSelector } from '@src/hooks/reduxHook';
import { Role, selectUserData } from '@src/redux/userSlice';
import { redirect } from 'next/navigation';
import React, { FC, PropsWithChildren } from 'react';
import { toast } from 'react-toastify';

const findAdminRole = (roles: Role[]) => roles.find((role) => role.id === 2);

const RequireAdmin: FC<PropsWithChildren> = ({ children }) => {
  const { roles } = useAppSelector(selectUserData);

  const isAdmin = findAdminRole(roles);

  if (!isAdmin) {
    toast.warning('Không có quyền truy cập');
    redirect('/');
  } else return <>{children}</>;
};

export default RequireAdmin;
