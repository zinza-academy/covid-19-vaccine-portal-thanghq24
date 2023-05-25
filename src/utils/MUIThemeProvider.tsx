'use client';

import { ThemeProvider } from '@mui/material';
import theme from './muiTheme';
import { FC } from 'react';

type ComponentProps = {
  children?: React.ReactNode;
};

const MUIThemeProvider: FC<ComponentProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MUIThemeProvider;
