import { Button } from "@mui/material";
import React from "react";

interface GradientButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const GradientButton = ({ text, onClick, disabled }: GradientButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      sx={{ color: "white" }}
      className={`inline-flex items-center justify-center w-full !px-4 !py-4 !text-base !font-semibold transition-all duration-200 !rounded-md focus:outline-none ${
        disabled
          ? "cursor-not-allowed bg-gray-300 text-gray-500"
          : "bg-gradient-to-r from-[#a26932] via-[#9c6530] to-[#c07d3b] hover:opacity-80 focus:opacity-80"
      }`}
    >
      {text}
    </Button>
  );
};

export default GradientButton;
