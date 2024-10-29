import { CartItemsListProps } from "@/types/Types";
import { Grid } from "@mui/material";
import { useState } from "react";
import HorizontaltemCardWithLensEffect from "../common/ItemCards/HorizontaltemCardWithLensEffect";
import HorizontalItemCard from "../common/ItemCards/HorizontaltemCard";

  const zoomFactor = 1.7;
  const lensSize = 110;
  
  const CartItemsList: React.FC<CartItemsListProps> = ({
    cartItems,
    handlerCartItems,
    isCheckoutCartItems
  }) => {
    const [hoveringItemId, setHoveringItemId] = useState<number | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 200, y: 150 });
  
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
      <Grid sx={{
        mt: 2,
        maxHeight: "70vh",
        overflowY: "auto",
        p: 2,
        mb: 4,
      }} container spacing={3} onClick={handlerCartItems}>
        {cartItems.map((_item) => (
          <Grid item xs={12} key={_item.id}>
              {isCheckoutCartItems ?
              <HorizontalItemCard item={_item} /> : 
              <HorizontaltemCardWithLensEffect lensSize={lensSize} zoomFactor={zoomFactor} item={_item} handleMouseMove={handleMouseMove} hoveringItemId={hoveringItemId} setHoveringItemId={setHoveringItemId} mousePosition={mousePosition}/>
              }
          </Grid>
        ))}
      </Grid>
    );
  };

  export default CartItemsList;