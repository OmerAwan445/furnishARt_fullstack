import CheckoutItemsDetails from "@/components/CheckoutPage/CheckoutItemsDetails";
import PaymentDetailsCard from "@/components/CheckoutPage/PaymentDetailsForm/PaymentDetailsCard";
import ClientSideSnackbar from "@/components/common/toasts/ClientSideSnackbar";
import CartSvs from "@/services/Cart";
import StripeSvs from "@/services/Stripe";
import { CookieKeys } from "@/types/Types";
import { Box, Button, Typography } from "@mui/material";
import { cookies } from "next/headers";
import Link from "next/link";

const CheckoutPage = async () => {
  const cartDetails = await CartSvs.getCartDetails();
  let stripe_cus_acc_id: any = cookies().get(CookieKeys.StripeCustomerId);
  if (!stripe_cus_acc_id) {
    stripe_cus_acc_id = await StripeSvs.getStripeCusAccId();
  }

  return (
    <>
      <ClientSideSnackbar />
      <Box className="lg:flex xl:flex-wrap justify-center g-0">
        {!cartDetails.data || cartDetails.data?.cart_total_price === 0 ? (
          <Box
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
            <PaymentDetailsCard stripe_cus_acc_id={stripe_cus_acc_id} />
          </>
        )}
      </Box>
    </>
  );
};

export default CheckoutPage;