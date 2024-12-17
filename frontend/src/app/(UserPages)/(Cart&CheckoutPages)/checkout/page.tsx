export const dynamic = 'force-dynamic';
export const revalidate = 0;

import CheckoutItemsDetails from "@/components/CheckoutPage/CheckoutItemsDetails";
import PaymentDetailsCard from "@/components/CheckoutPage/PaymentDetailsForm/PaymentDetailsCard";
import ClientSideSnackbar from "@/components/common/toasts/ClientSideSnackbar";
import CartSvs from "@/services/Cart";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

const CheckoutPage = async () => {
  const cartDetails = await CartSvs.getCartDetails();
  return (
    <>
      <ClientSideSnackbar />
      <Box component="div" className="lg:flex xl:flex-wrap justify-center g-0">
        {!cartDetails.data || cartDetails.data?.cart_total_price === 0 ? (
          <Box component="div"
            display="grid"
            justifyContent="center"
            textAlign="center"
            mt={10}
          >
            <Typography variant="h6" gutterBottom>
              Your cart is Empty...
            </Typography>
            <Button
              component={Link}
              href="/"
              variant="text"
              sx={{ textDecoration: "underline" }}
            >
              Go Home
            </Button>
            <Typography variant="body2">or</Typography>
            <Typography variant="body2">Browse furniture categories</Typography>
          </Box>
        ) : (
          <>
            <CheckoutItemsDetails cartData={cartDetails.data} />
            {/* Payment Details Card */}
            <PaymentDetailsCard />
          </>
        )}
      </Box>
    </>
  );
};

export default CheckoutPage;
