"use client";

import { useAppSelector } from "@/hooks/reduxHooks";
import Link from "next/link";
import { Fragment } from "react";
import { FaArrowRight } from "react-icons/fa";
// import BriefItemCard from "../commons/CourseCard/BriefItemCard";
import { CartActions } from "@/store/Slices/CartSlice";
import { GetCartDetailsResponse } from "@/types/Types";
import CartItemsSummary from "./CartItemsSummary";
import { Box, Container, Typography, Grid, Button } from "@mui/material";
import { Lens } from "../ui/lens";

function CartSummaryDetails({
  cartItems,
  cart_id,
  cart_total_price,
}: GetCartDetailsResponse) {
  const { cartItems: store_CartReducers } = useAppSelector(
    (state) => state.cart
  );
  console.log(store_CartReducers);
  // const { data } = useFetchCartItems();
  // const dispatch = useAppDispatch();
  // const { mutate: deleteCartItem } = useApiMutation();
  // const { removeCartItem } = CartSummaryActions;
  const { add_cart_summary_details } = CartActions;

  // Inspite of attaching event listener to all cart items attach a single event listener to the parent
  /*  const handlerCartItems = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const deleteButton = target.closest(".delete-button");
    const cartItem = target.closest("[data-cart-item-id]");
    if (deleteButton) {
      // Handle  delete button click on cart item
      // Access the cart-id from the 'data-cart-item-id' attribute
      const cartItemId = cartItem?.getAttribute("data-cart-item-id");
      if (cartItemId) {
        const endpoint = `/api/cart/remove-item/${cartItemId}/`;
        const method = "DELETE";
        const userData = "";
        // call delete api to delete the cart item
        deleteCartItem(
          { endpoint, method, userData, isPrivateReq: true },
          {
            // Update React Query Cache Manually
            onSuccess: () => {
              //  dispatch store by removing the cart_item with the same id
              dispatch(removeCartItem({ cartid: Number(cartItemId) }));
            },
          }
        );
      }
    }
  }; */

  return (
    <Fragment>
      <Container
        maxWidth="xl"
        sx={{
          overflowY: { sm: "scroll" },
          bgcolor: { md: "transparent" },
          py: 6,
        }}
      >
        {cartItems.length === 0 ? (
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
          <Grid container >
            <Grid
              item
              xs={12}
              lg={7}
              sx={{
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 3,
                p: 2,
                mb: { xs: 3, lg: 0 }, // Adjust margin-bottom for responsiveness
                mr: { lg: 3 }, // Add margin-right for spacing between grids on large screens          
              }}
            >
              <Box>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Cart items ({cartItems.length})
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Complete your purchase by providing payment details
                </Typography>

                {/*======= Cart Items List ======= */}
                <Lens cartItems={cartItems} />
                <Box
                  sx={{
                    mt: 2,
                    maxHeight: "70vh",
                    overflowY: "auto",
                    p: 2,
                    mb: 4,
                  }}
                >
                  {/* Add your cart items rendering logic here */}
                </Box>
              </Box>
            </Grid>

            <Grid
              item
              flex={1}
              sx={{
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 3,
                p: 2,
              }}
            >
              <CartItemsSummary total={cart_total_price} />
            </Grid>
          </Grid>
        )}
      </Container>
    </Fragment>
  );
}

export default CartSummaryDetails;
