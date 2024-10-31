"use client";

import { CartItem } from "@/types/Types";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography
} from "@mui/material";

function HorizontalItemCard({
  item,
}: { item: CartItem } ) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        position: "relative",
        overflow: "hidden",
        alignItems: "center",
        height: { xs: 100, sm: 120 },
      }}
    >
      <Box component="div" sx={{ position: "relative", width: { xs: 100, sm: 150 }, height: "100%" }}>
        <CardMedia
          component="img"
          src={item.thumbnail_image}
          alt={item.name}
          sx={{ width: "100%", height: "100%" }}
        />
      </Box>

      <CardContent
        sx={{
          marginLeft: 2,
          padding: 2,
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          width: "100%",
          height: "100%",
          flex: 1,
          position: "relative",
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "0.75rem", sm: "1.25rem" },
            backgroundImage: "linear-gradient(45deg, #5680E9, #8860D0)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            mr: 2,
          }}
          className="line-clamp-2"
        >
          {item.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: { xs: "0.75rem", sm: "1rem" }, fontStyle: "italic" }}
        >
          {item.price} - Qty: {item.quantity}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default HorizontalItemCard;
