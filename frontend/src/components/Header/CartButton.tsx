import theme from "@/utils/theme";
import { Button } from "@mui/material";

const CartButton = () => {
  return (
    <Button variant="outlined" size="large"
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
