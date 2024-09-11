import { CartItem } from "@/types/Types";
import { Grid } from "@mui/material";
import { useState } from "react";
import HorizontalItemCard from "../common/ItemCards/HorizontaltemCard";

interface CartItemsListProps {
    cartItems: CartItem[];
    handlerCartItems: (event: React.MouseEvent<HTMLDivElement>) => void;
  }

  const zoomFactor = 1.7;
  const lensSize = 110;
  
  const CartItemsList: React.FC<CartItemsListProps> = ({
    cartItems,
    handlerCartItems
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
      <Grid container spacing={2} onClick={handlerCartItems}>
        {cartItems.map((_item) => (
          <Grid item xs={12} key={_item.id}>
              <HorizontalItemCard lensSize={lensSize} zoomFactor={zoomFactor} item={_item} handleMouseMove={handleMouseMove} hoveringItemId={hoveringItemId} setHoveringItemId={setHoveringItemId} mousePosition={mousePosition}/>
          </Grid>
        ))}
      </Grid>
    );
  };

  export default CartItemsList;