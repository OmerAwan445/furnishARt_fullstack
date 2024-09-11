import CartSummaryDetails from '@/components/CartPage/CartSummaryDetails';
import { useAppStore } from '@/hooks/reduxHooks';
import CartSvs from '@/services/Cart';
import { CartActions } from '@/store/Slices/CartSlice';
import { Box, Typography } from '@mui/material';

const CartPage = async () => {
  const cartDetails = await CartSvs.getCartDetails();
  return (
    <Box>
      {cartDetails.data ?
        <CartSummaryDetails {...cartDetails.data} />
      : <Typography mt={4} textAlign={"center"} variant="h3">{cartDetails.message}</Typography>
      }
    </Box>
  )
}

export default CartPage
