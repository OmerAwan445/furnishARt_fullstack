import { CartItemsSummeryProps } from "@/types/Types";
import { Box, Divider, Typography } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
import BlackFilledButton from "../common/buttons/BlackFilledButton";

export default function CartSummary({ total }: CartItemsSummeryProps) {
  return (
    <Box mx={2.5} mt={2} sx={{ mt: { xl: 3 } }}>
      <Box mb={3} display="flex" flexDirection="column" alignItems="flex-start">
        <Typography
          variant="h4"
          component="h4"
          sx={{ fontSize: { sm: "1.125rem", lg: "1.5rem" }, fontWeight: "bold", color: "text.secondary" }}
        >
          Cart Summary
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: "0.75rem", fontWeight: 300, color: "text.secondary" }}
        >
          Click Proceed to pay button to buy the courses
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box display="flex" flexWrap="wrap">
        <Box flexGrow={1}>
          <Typography
            variant="h6"
            component="h6"
            sx={{ fontSize: { lg: "1.125rem" }, fontWeight: "bold", color: "text.primary" }}
          >
            Total
          </Typography>
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="flex-end">
          <Typography
            variant="h6"
            component="h6"
            sx={{ fontSize: { lg: "1.125rem" }, fontWeight: "bold", color: "text.primary" }}
          >
            ${total}
          </Typography>
        </Box>
      </Box>

      {/* <Link href="/checkout" passHref> */}
        <BlackFilledButton
          endIcon={<FaArrowRight />}
        >
          Proceed to Pay
        </BlackFilledButton>
      {/* </Link> */}
    </Box>
  );
}