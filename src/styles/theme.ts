// src/styles/theme.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32',
      contrastText: '#fff',
    },
    secondary: {
      main: '#666',
    },
    text: {
      primary: '#000000',
    },
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 4,
});
