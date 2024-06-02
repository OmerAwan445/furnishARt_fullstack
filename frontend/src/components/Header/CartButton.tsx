import theme from "@/utils/theme";
import { Button } from "@mui/material";
import React from "react";
import { BiCart } from "react-icons/bi";

const CartButton = () => {
  return (
    <Button variant="outlined" size="large" startIcon={<BiCart />}
    sx={
        {
        ':hover':{
         backgroundColor: theme.palette.primary.main,
         color: "white",
        },
        width: "150px"
    }}
    >
      Cart
    </Button>
  );
};

export default CartButton;
