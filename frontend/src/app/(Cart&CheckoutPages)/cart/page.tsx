export const fetchCache = 'force-no-store'
export const dynamic = 'force-dynamic'

import CartDetails from '@/components/CartPage/CartDetails';
import ClientSideSnackbar from '@/components/common/toasts/ClientSideSnackbar';
import CartSvs from '@/services/Cart';
import { Box, Typography } from '@mui/material';

const CartPage = async () => {
  const cartDetails = await CartSvs.getCartDetails();
  return (
    <Box>
      <ClientSideSnackbar />
      {cartDetails.data ?
        <CartDetails data={cartDetails.data}/>
      : <Typography mt={4} textAlign={"center"} variant="h3">{cartDetails.message}</Typography>
      }
    </Box>
  )
}

export default CartPage
