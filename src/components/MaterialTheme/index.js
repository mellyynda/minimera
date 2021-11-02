import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0A8B74',
      darker: '#075f4f',
    },
    neutral: {
      main: '#ebf4f3',
      contrastText: 'var(--text-color)',
    },
  }
});