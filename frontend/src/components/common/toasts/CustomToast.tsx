'use client';

import { CustomToastProps } from "@/types/Types";
import { Alert, Snackbar } from "@mui/material";
import React from "react";

// Define custom background colors for different alert types
const getToastStyles = (type: string) => {
  switch (type) {
    case 'success':
      return {
        backgroundColor: '#4caf50', // Bright green for success
        borderColor: '#388e3c',
        boxShadow: '0 0 10px rgba(76, 175, 80, 0.7)',
      };
    case 'error':
      return {
        backgroundColor: '#f44336', // Bright red for error
        borderColor: '#d32f2f',
        boxShadow: '0 0 10px rgba(244, 67, 54, 0.7)',
      };
    case 'info':
      return {
        backgroundColor: 'transparent', // Bright blue for info
        borderColor: 'transparent',
        boxShadow: '0 0 10px rgba(33, 150, 243, 0.7)',
      };
    default:
      return {
        backgroundColor: 'transparent', // Default for any other type
        borderColor: 'transparent',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      };
  }
};

const CustomToast = ({ open, handleClose, children, type }: CustomToastProps) => {
  const styles = getToastStyles(type); // Get the styles based on alert type

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      sx={{
        width: {
          xs: '90%',
          sm: '75%',
          md: '50%',
          lg: '35%',
        },
        '& .MuiAlert-root': {
          ...styles, // Apply custom styles
          animation: 'bounceIn 0.6s', // Adds a bounce-in animation for more attention
          border: `1px solid ${styles.borderColor}`,
          borderRadius: "12px",
          padding: '10px',
          color: '#fff',
          fontWeight: 'bold',
          '@keyframes bounceIn': {
            '0%': {
              transform: 'scale(0.5)',
              opacity: 0,
            },
            '60%': {
              transform: 'scale(1.1)',
              opacity: 1,
            },
            '80%': {
              transform: 'scale(0.9)',
            },
            '100%': {
              transform: 'scale(1)',
            },
          },
        },
      }}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {children}
      </Alert>
    </Snackbar>
  );
};

export default CustomToast;
