'use client';

import React, { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from '@src/redux/store';

const ReduxStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxStoreProvider;
