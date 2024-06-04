import { SuccessMessageToastProps } from "@/types/Types";
import { Alert, Snackbar } from "@mui/material";
import React from "react";

const SuccessMessageToast = ({ open, handleClose, children }: SuccessMessageToastProps) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {children}
      </Alert>
    </Snackbar>
  );
};

export default SuccessMessageToast;
