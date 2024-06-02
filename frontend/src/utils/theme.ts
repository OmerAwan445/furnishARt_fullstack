'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#BDBDBD', // Light grey
    },
    secondary: {
      main: '#A1887F', // Light brownish
    },
    error: {
      main: '#D32F2F', // Red for error
    },
    background: {
      default: '#F5F5F5', // Light grey background
    },
    text: {
      primary: '#333333', // Dark grey for primary text
      secondary: '#555555', // Medium grey for secondary text
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Default font family
  },
});

export default theme;

