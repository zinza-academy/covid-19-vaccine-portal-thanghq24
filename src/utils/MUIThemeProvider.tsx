'use client';

import { ThemeProvider } from '@mui/material';
import theme from './muiTheme';

export default function MUIThemeProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
