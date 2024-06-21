"use client";

import { CustomButtonProps } from '@/types/Types';
import theme from '@/utils/theme';
import { Button } from '@mui/material';
import React from 'react'

const DefaultButton = ({ children, disabled, ...props }: CustomButtonProps ) => {
    return (
      <Button
        {...props}
        type="submit"
        disabled={disabled}
        sx={{
          ":hover": {
            backgroundColor: !disabled ? theme.palette.background.lightBrown : theme.palette.action.disabledBackground,
          },
          backgroundColor: !disabled ? theme.palette.background.brownish : theme.palette.action.disabledBackground,
          color: !disabled ? theme.palette.primary.contrastText : theme.palette.action.disabled,
          height: "42px",
          borderRadius: "6px",
        }}
        color="primary"
        variant="contained"
      >
        {children}
      </Button>
    );
  };

export default DefaultButton
