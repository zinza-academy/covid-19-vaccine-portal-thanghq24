import React, { FC, PropsWithChildren } from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import MUIThemeProvider from '@utils/MUIThemeProvider';
import TanStackQueryProvider from '@utils/TanStackQueryProvider';

const inter = Inter({ subsets: ['latin'] });

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vaccine Portal'
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanStackQueryProvider>
          <MUIThemeProvider>{children}</MUIThemeProvider>
        </TanStackQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
