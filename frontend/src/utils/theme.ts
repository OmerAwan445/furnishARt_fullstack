'use client';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    black: string;
    brownish: string;
    lightBrown: string;
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
      brownish: "#aa9784",
      lightBrown: "#baab9b",
    },
    text: {
      primary: '#333333',
      secondary: '#f3f3f3',
    },
  },
  typography: {
    h1: {
      fontSize: '6rem', // Default font size for h1
      '@media (max-width:1200px)': {
        fontSize: '4.5rem', // Adjust font size for large screens
      },
      '@media (max-width:900px)': {
        fontSize: '3.75rem', // Adjust font size for medium screens
      },
      '@media (max-width:600px)': {
        fontSize: '3rem', // Adjust font size for small screens
      },
    },
    h2: {
      fontSize: '3.75rem', // Default font size for h2
      '@media (max-width:1200px)': {
        fontSize: '3rem', // Adjust font size for large screens
      },
      '@media (max-width:900px)': {
        fontSize: '2.5rem', // Adjust font size for medium screens
      },
      '@media (max-width:600px)': {
        fontSize: '2.125rem', // Adjust font size for small screens
      },
    },
    h3: {
      fontSize: '3rem', // Default font size for h3
      '@media (max-width:1200px)': {
        fontSize: '2.5rem', // Adjust font size for large screens
      },
      '@media (max-width:900px)': {
        fontSize: '2.125rem', // Adjust font size for medium screens
      },
      '@media (max-width:600px)': {
        fontSize: '1.75rem', // Adjust font size for small screens
      },
    },
    h4: {
      fontSize: '2.125rem', // Default font size for h4
      '@media (max-width:1200px)': {
        fontSize: '1.75rem', // Adjust font size for large screens
      },
      '@media (max-width:900px)': {
        fontSize: '1.5rem', // Adjust font size for medium screens
      },
      '@media (max-width:600px)': {
        fontSize: '1.25rem', // Adjust font size for small screens
      },
    },
    h5: {
      fontSize: '1.5rem', // Default font size for h5
      '@media (max-width:1200px)': {
        fontSize: '1.375rem', // Adjust font size for large screens
      },
      '@media (max-width:900px)': {
        fontSize: '1.25rem', // Adjust font size for medium screens
      },
      '@media (max-width:600px)': {
        fontSize: '1rem', // Adjust font size for small screens
      },
    },
    h6: {
      fontSize: '1.25rem', // Default font size for h6
      '@media (max-width:1200px)': {
        fontSize: '1.125rem', // Adjust font size for large screens
      },
      '@media (max-width:900px)': {
        fontSize: '1rem', // Adjust font size for medium screens
      },
      '@media (max-width:600px)': {
        fontSize: '0.875rem', // Adjust font size for small screens
      },
    },
    body1: {
      fontSize: '1rem', // Default font size for body1 (paragraphs)
      '@media (max-width:1200px)': {
        fontSize: '0.9375rem', // Adjust font size for large screens
      },
      '@media (max-width:900px)': {
        fontSize: '0.875rem', // Adjust font size for medium screens
      },
      '@media (max-width:600px)': {
        fontSize: '0.8125rem', // Adjust font size for small screens
      },
    },
  },
  components: {
    // Add component overrides if needed
  },
});


export default theme;

