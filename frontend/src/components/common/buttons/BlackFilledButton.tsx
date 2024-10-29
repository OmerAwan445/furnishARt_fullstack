"use client";

import { CustomButtonProps } from "@/types/Types";
import theme from "@/utils/theme";
import { Button } from "@mui/material";

const BlackFilledButton = ({ children, ...props }: CustomButtonProps) => {
  return (
    <Button
      fullWidth
      disabled={props.disabled}
      className={`transition-transform duration-500 ease-in-out ${
        props.disabled
          ? "bg-gray-400 !cursor-not-allowed"
          : "bg-black text-white hover:bg-black hover:shadow-lg hover:scale-105"
      }`}
      sx={{
        mt: 2,
        height: { lg: 48, sm: 40 },
        backgroundColor: props.disabled
          ? "gray"
          : theme.palette.background.black,
        color: "#fff",
        "&:hover": {
          backgroundColor: props.disabled
            ? "gray"
            : theme.palette.background.black,
          boxShadow: !props.disabled
            ? "0px 4px 10px rgba(0, 0, 0, 0.3)"
            : "none", 
          transform: !props.disabled ? "scale(1.03)" : "none",
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
