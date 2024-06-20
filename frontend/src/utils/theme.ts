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
  components: {
    
  },
});

export default theme;

