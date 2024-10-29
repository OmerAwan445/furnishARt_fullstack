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
        <CartDetails data={cartDetails.data}/>
    </Box>
  )
}

export default CartPage
