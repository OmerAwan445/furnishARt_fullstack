"use client";

import useFetchPaymentMethods from "@/hooks/useFetchPaymentMethods";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import AddPaymentMethodForm from "./AddPaymentMethodForm";
import PaymentInstructions from "./PaymentInstructions";
import SavedPaymentMethods from "./SavedPaymentMethods";
import SkeletonLoader from "../SkeletonLoader";


const PaymentDetailsCard = () => {
  const { data: saved_card, isLoading} = useFetchPaymentMethods();
  const [showPaymentForm, setShowPaymentForm] = useState(
    saved_card?.length === 0
  );
  
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
  );

  useEffect(()=>{
    setShowPaymentForm(saved_card?.length == 0);
  },[saved_card])

  return (
    <Elements stripe={stripePromise}>
      <div className="w-full px-4 py-2 md:px-0 lg:w-2/4 lg:py-0">
        <div className="md:mx-6 lg:p-8">
          <PaymentInstructions />
          { isLoading ? <SkeletonLoader /> :
          showPaymentForm ? 
            <AddPaymentMethodForm setShowPaymentForm={setShowPaymentForm}/>
          :
            <SavedPaymentMethods
              paymentMethods={saved_card!!}
              showPaymentForm={setShowPaymentForm}
            />
          }
        </div>
      </div>
    </Elements>
  );
};

export default PaymentDetailsCard;
