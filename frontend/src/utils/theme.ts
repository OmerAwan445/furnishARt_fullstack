'use client';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    black: string;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#754c24',
      light: '#9c6530',
    },
    secondary: {
      main: '#f3f3f3',
      light: '#fafafa',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
      black: '#222222',
    },
    text: {
      primary: '#333333',
      secondary: '#f3f3f3',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'gray',
            },
            '&:hover fieldset': {
              borderColor: 'gray',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'gray',
              outline: 'none',
              boxShadow: '0 0 5px rgba(81, 203, 238, 1)',
            },
          },
        },
      },
    },
  },
});

export default theme;

