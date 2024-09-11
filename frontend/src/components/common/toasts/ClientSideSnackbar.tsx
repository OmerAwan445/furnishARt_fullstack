"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import CustomToast from "./CustomToast";
import { SnakcBarActions } from "@/store/Slices/SnackBarSlice";

const ClientSideSnackbar = () => {
  const dispatch = useAppDispatch();
  const { message, open, type } = useAppSelector((state) => state.snackbar);
  const { closeSnackbar } = SnakcBarActions;
  
  return (
    <CustomToast
      handleClose={() => dispatch(closeSnackbar())}
      open={open}
      type={type ?? "success"}
    >
      {message}
    </CustomToast>
  );
};

export default ClientSideSnackbar;
