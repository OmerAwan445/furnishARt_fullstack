"use client";

import { CustomButtonProps } from "@/types/Types";
import theme from "@/utils/theme";
import { Button } from "@mui/material";

const BlackFilledButton = ({ children, ...props }: CustomButtonProps) => {
  return (
    <Button
      fullWidth
      sx={{
        mt: 2,
        height: { lg: 48, sm: 40 },
        backgroundColor: theme.palette.background.black,
        color: "#fff",
        "&:hover": {
          backgroundColor: theme.palette.background.black,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          transform: "scale(1.03)",
        },
        transition: "transform 0.5s ease, box-shadow 0.3s ease",
        borderRadius: 1,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default BlackFilledButton;
