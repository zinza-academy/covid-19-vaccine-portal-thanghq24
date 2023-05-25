import { createTheme } from '@mui/material';
import { indigo } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[700]
    },
    success: { main: '#66BB6A', contrastText: '#fff' }
  },
  typography: {
    button: {
      fontSize: '1rem',
      fontWeight: 700
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          padding: '6px 16px',
          borderRadius: '8px',
          borderBottomLeftRadius: 0
        },
        sizeLarge: {
          padding: '8px 22px'
        }
      }
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          borderRadius: '8px',
          borderBottomLeftRadius: 0
        }
      }
    }
  }
});

export default theme;
