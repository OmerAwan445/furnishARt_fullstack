import React from 'react'
import DefaultButton from './DefaultButton'
import CartSvs from '@/services/Cart'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { SnackBarActions } from '@/store/Slices/SnackBarSlice'
import { useRouter } from 'next/navigation'

const AddToCartButton = ({ quantity = 1, furnitureId }: { furnitureId: number, quantity?: number }) => {

  const dispatch = useAppDispatch();
  const { addMessage } = SnackBarActions;
  const router = useRouter();

 async function handlerOnClick(){
    const { error, message, statusCode } = await CartSvs.addCartItem(furnitureId, quantity);
    if (error && statusCode == 401) {
      router.push(`/login?callbackUrl=/furniture/${furnitureId}`);
    }
    else {
      dispatch(addMessage({ message, type: error ? "error" : "success" }));
    }
  }

  return (
    <DefaultButton onClick={handlerOnClick} sx={{
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
