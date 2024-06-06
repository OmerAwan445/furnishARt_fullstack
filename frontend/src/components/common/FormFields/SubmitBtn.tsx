"use client";

import { CustomButtonProps } from "@/types/Types";
import theme from "@/utils/theme";
import Button from "@mui/material/Button";
import React from "react";

const SubmitBtn = ({ children, disabled, ...props }: CustomButtonProps ) => {
  return (
    <Button
      {...props}
      type="submit"
      disabled={disabled}
      sx={{
        ":hover": {
          backgroundColor: !disabled ? theme.palette.primary.light : theme.palette.action.disabledBackground,
        },
        backgroundColor: !disabled ? theme.palette.primary.main : theme.palette.action.disabledBackground,
        color: !disabled ? theme.palette.primary.contrastText : theme.palette.action.disabled,
        width: "100%",
        height: "56px",
        borderRadius: "8px",
      }}
      color="primary"
      variant="contained"
    >
      {children}
    </Button>
  );
};

export default SubmitBtn;
