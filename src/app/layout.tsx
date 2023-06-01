import React, { FC, PropsWithChildren } from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import MUIThemeProvider from '@utils/MUIThemeProvider';
import TanStackQueryProvider from '@utils/TanStackQueryProvider';
import ClientSideLayout from '@components/sharedComponents/layout/ClientSideLayout';

const inter = Inter({ subsets: ['latin'] });

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vaccine Portal'
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <TanStackQueryProvider>
            <MUIThemeProvider>
              <ClientSideLayout>{children}</ClientSideLayout>
            </MUIThemeProvider>
          </TanStackQueryProvider>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
