"use client";

import Lens from "@/components/ui/lens"; // Import Lens component
import { HorizontaltemCardWithLensEffectProps } from "@/types/Types";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";

function HorizontaltemCardWithLensEffect({
  item,
  hoveringItemId,
  mousePosition,
  handleMouseMove,
  setHoveringItemId,
  lensSize,
  zoomFactor,
}: HorizontaltemCardWithLensEffectProps) {
  return (
    <Card
      onMouseLeave={() => setHoveringItemId(null)}
      sx={{
        display: "flex",
        flexDirection: "row",
        position: "relative",
        overflow: "hidden",
        alignItems: "center",
        height: {'xs': 110, 'sm': 160 },
      }}
    >
      <Box component="div"
        sx={{ position: "relative", width: {'xs': 100, 'sm': 170 }, height: "90%" }}
        onMouseMove={(e: any) => handleMouseMove(e, item.id)}
        onMouseEnter={(e: any) => handleMouseMove(e, item.id)}
      >
        <CardMedia
          component="img"
          src={item.thumbnail_image}
          alt={item.name}
          sx={{ width: "100%", height: "100%" }}
        />

        {/* Reusable Lens component */}
        <Lens
          image={item.thumbnail_image}
          mousePosition={mousePosition}
          lensSize={lensSize}
          zoomFactor={zoomFactor}
          isHovering={hoveringItemId === item.id}
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
        {/* Delete Icon Positioned Top-Right */}
        <IconButton
          data-cart-item-id={item.id}
          className="delete-button"
          aria-label="delete"
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <AiOutlineDelete className="text-lg md:text-2xl dark:text-white text-gray-500 cursor-pointer" />
        </IconButton>

        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            fontSize: {'xs':'0.75rem', 'sm': "1.25rem"},
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
          sx={{ fontSize: {'xs':'0.75rem', 'sm': "1rem"}          , fontStyle: "italic" }}
        >
          {item.price} - Qty: {item.quantity}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default HorizontaltemCardWithLensEffect;
