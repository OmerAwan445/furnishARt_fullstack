'use client';
import { createTheme } from '@mui/material/styles';
import { poppins } from './fontfamily';

declare module '@mui/material/styles' {
  interface TypeBackground {
    black: string;
    brownish: string;
    lightBrown: string;
    accent: string;
  }
  interface Palette {
    accent: Palette['primary'];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#754c24',    // Rich brown
      light: '#d18f49',   // Vibrant amber
      dark: '#4a2b17',    // Deep brown for contrast
    },
    secondary: {
      main: '#f3f3f3',    // Light gray
      light: '#ffffff',   // Pure white
      dark: '#cccccc',    // Soft gray for subtlety
    },
    background: {
      default: '#f0e6dc', // Warm beige
      paper: '#ffffff',   // Paper white
      accent: '#ffcf8b',  // Soft peach for highlights
      black: '#222222',   // Neutral black for depth
      brownish: "#aa9784", // Muted brown for background elements
      lightBrown: "#baab9b", // Light brown for subtle background tones
    },
    text: {
      primary: '#333333', // Dark gray for readability
      secondary: '#cecece', // Light gray for secondary text
      // accent: '#d18f49', // Amber for emphasis text
    },
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
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

