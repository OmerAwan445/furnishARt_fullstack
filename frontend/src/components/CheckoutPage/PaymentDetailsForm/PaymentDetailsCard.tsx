"use client";

import { useAppSelector } from "@/hooks/reduxHooks";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FC, useEffect, useState } from "react";
import AddPaymentMethodForm from "./AddPaymentMethodForm";
import PaymentInstructions from "./PaymentInstructions";
import SavedPaymentMethods from "./SavedPaymentMethods";
import { CookieKeys } from "@/types/Types";
import { createSecureCookie } from "@/server-actions/setCookies";


const PaymentDetailsCard: FC<{ stripe_cus_acc_id: string }> = ({ stripe_cus_acc_id }) => {
  const paymentMethodsData = useAppSelector((state) => state.paymentMethods);
  const [showPaymentForm, setShowPaymentForm] = useState(
    paymentMethodsData.length === 0
  );
  
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
  );

  useEffect(() => {
    createSecureCookie(CookieKeys.StripeCustomerId, stripe_cus_acc_id).then();
    // fetch payment methods
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <div className="w-full px-4 py-2 md:px-0 lg:w-2/4 lg:py-0">
        <div className="md:mx-6 lg:p-8">
          <PaymentInstructions />
          {showPaymentForm ? (
            <AddPaymentMethodForm />
          ) : (
            <SavedPaymentMethods
              showPaymentForm={setShowPaymentForm}
            />
          )}
        </div>
      </div>
    </Elements>
  );
};

export default PaymentDetailsCard;
