import { useAppSelector } from "@/hooks/reduxHooks";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import PaymentMethodCard from "./PaymentMethodCard";

function SavedPaymentMethods({
  showPaymentForm,
}: {
  showPaymentForm: React.Dispatch<boolean>;
}) {
  const [checkedCardId, setCheckedCardId] = useState("");
  const paymentMethodsData = useAppSelector((state) => state.paymentMethods);
  // const {mutate:payCourse, isPending} = usePayCart();

  // async function handleProceedPayment(){
  //     if(!cart_id || !stripe_cus_acc_id || !checkedCardId) return
  //     payCourse({cart_id,stripe_cus_acc_id,pm_id:checkedCardId});
  // }

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
            className="float-right text-maincolor border border-maincolor rounded-2xl text-sm xl:py-1 xl:px-2 py-1 px-2"
          >
            + Add New
          </button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {paymentMethodsData.map((cardData) => (
          <PaymentMethodCard
            checkedCardId={checkedCardId}
            setCheckedCardId={setCheckedCardId}
            cardDetails={cardData}
          />
        ))}
      </div>
      <hr className="xl:mb-5 lg:mt-4 mt-2 mb-3 border" />
      <button
        // disabled={isPending }
        // onClick={handleProceedPayment}
        className="mt-5 disabled:!bg-blue-gray-600 disabled:cursor-default
                flex h-12 w-full cursor-pointer items-center justify-between rounded-md bg-maincolor hover:bg-maincolordeep px-7 text-center text-white lg:mt-4 xl:mt-5 xl:text-sm"
      >
        <span className="justify-center text-center text-sm">
          Proceed to Pay
        </span>
        <FaArrowRight className="max-h-10 w-6 lg:w-auto xl:pl-12" />
      </button>
    </div>
  );
}

export default SavedPaymentMethods;
