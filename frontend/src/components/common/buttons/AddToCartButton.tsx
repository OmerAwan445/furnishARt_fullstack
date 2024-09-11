import React from 'react'
import DefaultButton from './DefaultButton'
import CartSvs from '@/services/Cart'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { SnakcBarActions } from '@/store/Slices/SnackBarSlice'

const AddToCartButton = ({ quantity = 1, furnitureId }: { furnitureId: number, quantity?: number }) => {

  const dispatch = useAppDispatch();
  const { addMessage } = SnakcBarActions;

  return (
    <DefaultButton onClick={async ()=> {
        const { error, message } = await CartSvs.addCartItem(furnitureId, quantity)
        dispatch(addMessage({ message, type: error ? "error" : "success" }));
    }} sx={{
        background: "linear-gradient(90deg, #A69080 0%, #f5a623 100%)", // Warm gradient for button
        color: "#000",
        "&:hover": {
          background: "linear-gradient(90deg, #f5a623 0%, #A69080 100%)",
        },
      }}>
        Add to cart
      </DefaultButton>
  )
}

export default AddToCartButton
