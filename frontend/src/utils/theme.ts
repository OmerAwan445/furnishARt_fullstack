'use client';
import { createTheme } from '@mui/material/styles';
import { poppins } from './fontfamily';

declare module '@mui/material/styles' {
  interface TypeBackground {
    black: string;
    brownish: string;
    lightBrown: string;
    accent: string;
    green: string;
  }
  interface Palette {
    accent: Palette['primary'];
  }
}


const theme = createTheme({
  palette: {
    primary: {
      main: '#865D36',    // Warm brown for primary elements
      light: '#AC8968',   // Soft beige for light accents
      dark: '#3E362E',    // Deep brown for contrast and depth
    },
    secondary: {
      main: '#A69080',    // Muted taupe for secondary elements
      light: '#FFFFFF',   // Pure white for light contrast
      dark: '#93785B',    // Rich tan for subtler accents
    },
    background: {
      default: '#F0E6DC', // Warm neutral for main background
      paper: '#FFFFFF',   // Clean white for cards and surfaces
      accent: '#A69080',  // Soft taupe for highlights
      black: '#3E362E',   // Deep brownish-black for depth
      brownish: "#93785B", // Muted brown for background elements
      lightBrown: "#AC8968", // Soft beige for subtle background tones
      green: '#4CAF50',   // Green for success messages
    },
    text: {
      primary: '#3E362E', // Deep brown for readability
      secondary: '#A69080', // Muted taupe for secondary text
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

