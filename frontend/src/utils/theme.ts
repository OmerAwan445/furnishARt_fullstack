'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#222222',
      light: '#484848',
    },
    secondary: {
      main: '#f3f3f3',
      light: '#fafafa',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#f3f3f3',
    },
  },

});

export default theme;

