import { CustomToastProps } from "@/types/Types";
import { Alert, Snackbar } from "@mui/material";
import React from "react";

const CustomToast = ({ open, handleClose, children, type, }: CustomToastProps) => {
  return (
    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {children}
      </Alert>
    </Snackbar>
  );
};

export default CustomToast;
