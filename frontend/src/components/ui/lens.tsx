"use client";

import { CartItem } from "@/types/Types";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material"; // Aceternity imports
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

interface LensProps {
  cartItems: CartItem[]; // Array of cart items
  zoomFactor?: number;
  lensSize?: number;
  position?: {
    x: number;
    y: number;
  };
  isStatic?: boolean;
  isFocusing?: () => void;
  hovering?: boolean;
  setHovering?: (hovering: boolean) => void;
}

export const Lens: React.FC<LensProps> = ({
  cartItems,
  zoomFactor = 1.9,
  lensSize = 110
}) => {
  const [hoveringItemId, setHoveringItemId] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 100, y: 100 });

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    itemId: number
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
    setHoveringItemId(itemId);
  };

  return (
    <Grid container spacing={2}>
      {cartItems.map((item) => (
        <Grid item xs={12} key={item.id}>
          <Card
            onMouseEnter={(e: any) => handleMouseMove(e, item.id)}
            onMouseLeave={() => setHoveringItemId(null)}
            onMouseMove={(e: any) => handleMouseMove(e, item.id)}
            sx={{
              display: "flex",
              flexDirection: "row", // Horizontal layout
              position: "relative",
              overflow: "hidden",
              alignItems: "center",
              height: 160
            }}
          >
            <Box sx={{ position: 'relative', width: 170, height: "90%" }}>
              <CardMedia
                component="img"
                src={item.thumbnail_image}
                alt={item.name}
                sx={{ width: "100%", height: "100%" }}
              />

              <AnimatePresence>
                {hoveringItemId === item.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.58 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      maskImage: `radial-gradient(circle ${lensSize / 2}px at ${
                        mousePosition.x
                      }px ${mousePosition.y}px, black 100%, transparent 100%)`,
                      WebkitMaskImage: `radial-gradient(circle ${
                        lensSize / 2
                      }px at ${mousePosition.x}px ${
                        mousePosition.y
                      }px, black 100%, transparent 100%)`,
                      transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
                      zIndex: 50,
                    }}
                  >
                    <div
                      style={{
                        transform: `scale(${zoomFactor})`,
                        transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
                      }}
                    >
                      <img
                        src={item.thumbnail_image}
                        alt={item.name}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>

            <CardContent
              sx={{
                marginLeft: 2,
                padding: 2,
                borderRadius: 2,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                width: "100%",
                height: "100%",
                flex:1,
                position: "relative", // For positioning the delete button
              }}
            >
              {/* Delete Icon Positioned Top-Right */}
              <IconButton
                aria-label="delete"
                size="small"
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                }}
                // onClick={() => handleDelete(item.id)} // Implement handleDelete to remove the item
              >
              <AiOutlineDelete className="text-lg md:text-2xl dark:text-white text-gray-500 cursor-pointer"/>
              </IconButton>

              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                  backgroundImage: "linear-gradient(45deg, #5680E9, #8860D0)",
                  WebkitBackgroundClip: "text",
                  color: "transparent", // Gradient text effect
                }}
              >
                {item.name}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: "1rem",
                  fontStyle: "italic",
                }}
              >
                {item.price} - Qty: {item.quantity}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
