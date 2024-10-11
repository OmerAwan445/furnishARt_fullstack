import StripeSvs from "@/services/Stripe";
import { SnackBarActions } from "@/store/Slices/SnackBarSlice";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export const usePayCart = () => {
  const dispatch = useDispatch();
  const { addMessage } = SnackBarActions;
  const router = useRouter();

  return useMutation({
    mutationFn: StripeSvs.payCart,
    onSuccess: () => {
      router.push("/order-complete");
    },
    onError: (err) => {
      dispatch(addMessage({ message: err.message, type: "error" }));
    },
  });
};
