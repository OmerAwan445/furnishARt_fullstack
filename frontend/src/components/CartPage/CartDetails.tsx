"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import CartSvs from "@/services/Cart";
import { GetCartDetailsResponse } from "@/types/Types";
import { removeCartItem } from "@/utils/cart/removeCartItem";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import CartItemsList from "./CartItemsList";
import CartSummary from "./CartISummary";

function CartSummaryDetails(props: { data: GetCartDetailsResponse }) {
  const [cartData, setCartData] = useState(props.data);

  const { mutate: deleteCartItem } = useMutation({
    mutationFn: CartSvs.removeCartItem,
  });

  // Inspite of attaching event listener to all cart items attach a single event listener to the parent
  const handlerCartItems = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const deleteButton = target.closest(".delete-button");
    const cartItem = target.closest("[data-cart-item-id]");
    if (deleteButton) {
      // Access the cart-id from the 'data-cart-item-id' attribute
      const cartItemId = cartItem?.getAttribute("data-cart-item-id");
      if (cartItemId) {
        deleteCartItem(Number(cartItemId), {
          onSuccess: () => {
            setCartData(removeCartItem(cartData, Number(cartItemId)));
          },
        });
      }
    }
  };

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
        {cartData.cartItems.length === 0 ? (
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
          <Grid container>
            <Grid
              item
              xs={12}
              lg={7}
              sx={{
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 3,
                p: 2,
                mb: { xs: 3, lg: 0 },
                mr: { lg: 3 },
              }}
            >
              <Box>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Cart items ({cartData.cartItems.length})
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Complete your purchase by providing payment details
                </Typography>

                {/*======= Cart Items List ======= */}
                <CartItemsList handlerCartItems={handlerCartItems} cartItems={cartData.cartItems}/>
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
              <CartSummary total={cartData.cart_total_price} />
            </Grid>
          </Grid>
        )}
      </Container>
    </Fragment>
  );
}

export default CartSummaryDetails;
