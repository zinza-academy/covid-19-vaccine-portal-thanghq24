import React, { FC, PropsWithChildren } from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import MUIThemeProvider from '@utils/MUIThemeProvider';
import TanStackQueryProvider from '@utils/TanStackQueryProvider';

const inter = Inter({ subsets: ['latin'] });

import { Metadata } from 'next';
import ReduxStoreProvider from '@src/utils/ReduxStoreProvider';
import ToastProvider from '@src/utils/ToastProvider';

export const metadata: Metadata = {
  title: 'Vaccine Portal'
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <ReduxStoreProvider>
            <TanStackQueryProvider>
              <MUIThemeProvider>
                <ToastProvider>{children}</ToastProvider>
              </MUIThemeProvider>
            </TanStackQueryProvider>
          </ReduxStoreProvider>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
