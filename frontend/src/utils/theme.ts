'use client';
import { createTheme } from '@mui/material/styles';
import { red, blue, green } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
      light: blue[300],
      dark: blue[700],
      contrastText: '#fff',
    },
    secondary: {
      main: green[500],
      light: green[300],
      dark: green[700],
      contrastText: '#fff',
    },
    error: {
      main: red[500],
      contrastText: '#fff',
    },
    background: {
      default: '#f5f5f5',
    },
    text: {
      primary: '#333',
      secondary: '#555',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  });

export default theme;
