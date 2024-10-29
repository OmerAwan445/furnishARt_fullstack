import { useAppSelector } from "@/hooks/reduxHooks";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import PaymentMethodCard from "./PaymentMethodCard";
import { PaymentMethods } from "@/types/Types";
import BlackFilledButton from "@/components/common/buttons/BlackFilledButton";
import { usePayCart } from "@/hooks/usePayCart";
import { useDispatch } from "react-redux";
import { SnackBarActions } from "@/store/Slices/SnackBarSlice";

function SavedPaymentMethods({
  showPaymentForm,
  paymentMethods
}: {
  showPaymentForm: React.Dispatch<boolean>,
  paymentMethods: PaymentMethods[]
}) {
  const [checkedCardId, setCheckedCardId] = useState("");
  const {mutate:payCourse, isPending} = usePayCart();
  const dispatch = useDispatch();
  const { addMessage } = SnackBarActions;

  async function handleProceedPayment(){
      if(!checkedCardId) return dispatch(addMessage({ message: "Select a Card", type: 'error' }));
      payCourse({ pm_id:checkedCardId });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center mb-2">
        <div className="w-2/3 sm:w-3/4 lg:w-1/2">
          <div className="flex">
            <h6 className="text-maingray text-lg font-semibold lg:mt-1 dark:text-white xl:font-light">
              Recent Payment Method
            </h6>
          </div>
        </div>
        <div className="w-1/3 sm:w-3/12 lg:w-1/2">
          <button
            onClick={() => {
              showPaymentForm(true);
            }}
            className="float-right text-green-500 border border-green-500 hover:bg-green-500 hover:text-white rounded-2xl text-sm xl:py-1 xl:px-2 py-1 px-2"
          >
            + Add New
          </button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {paymentMethods.map((cardData) => (
          <PaymentMethodCard
            checkedCardId={checkedCardId}
            setCheckedCardId={setCheckedCardId}
            cardDetails={cardData}
          />
        ))}
      </div>
      <hr className="xl:mb-5 lg:mt-4 mt-2 mb-3 border" />
      <BlackFilledButton
        disabled= {isPending}
      onClick={handleProceedPayment}
        type="submit"
          endIcon={<FaArrowRight />}
        >
          Proceed to Pay
        </BlackFilledButton>
    </div>
  );
}

export default SavedPaymentMethods;
