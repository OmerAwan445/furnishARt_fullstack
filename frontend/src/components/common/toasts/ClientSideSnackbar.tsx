"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import CustomToast from "./CustomToast";
import { SnackBarActions } from "@/store/Slices/SnackBarSlice";

const ClientSideSnackbar = () => {
  const dispatch = useAppDispatch();
  const { message, open, type } = useAppSelector((state) => state.snackbar);
  const { closeSnackbar } = SnackBarActions;
    
  return (
    <CustomToast
      handleClose={() => dispatch(closeSnackbar())}
      open={open}
      type={type ?? "info"}
    >
      {message}
    </CustomToast>
  );
};

export default ClientSideSnackbar;
