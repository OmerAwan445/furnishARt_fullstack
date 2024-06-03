"use client";

import theme from "@/utils/theme";
import Button from "@mui/material/Button";
import React from "react";

type SubmitBtnProps = {
  text?: string;
};

const SubmitBtn: React.FC<SubmitBtnProps> = ({ text }) => {
  return (
    <Button
      type="submit"
      sx={{
        ":hover": {
          backgroundColor: theme.palette.primary.light,
        },
        backgroundColor: theme.palette.primary.main,
        width: "100%",
        height: "56px",
        borderRadius: "8px",
      }}
      color="primary"
      variant="contained"
    >
      {text || "Submit"}
    </Button>
  );
};

export default SubmitBtn;
