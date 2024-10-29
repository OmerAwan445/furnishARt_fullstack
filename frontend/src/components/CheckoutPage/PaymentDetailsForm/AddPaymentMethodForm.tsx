'use client';

import BlackFilledButton from "@/components/common/buttons/BlackFilledButton";
import { usePayCart } from "@/hooks/usePayCart";
import { SnackBarActions } from "@/store/Slices/SnackBarSlice";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { FormEvent, SetStateAction, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch } from "react-redux";


function AddPaymentMethodForm({ setShowPaymentForm }: {setShowPaymentForm: React.Dispatch<SetStateAction<boolean>> }) {
  const stripe = useStripe()
  const elements = useElements()
  const [saveCard, setSaveCard] = useState(false)
  const { mutate: payCartCourses, isPending: payCartCourse_isLoading } = usePayCart();
  const { addMessage } = SnackBarActions;
  const dispatch =  useDispatch();
  const [billingDetails, setBillingDetails] = useState({
    cardholderName: "",
  })
  

  async function handleSubmitCardDetails(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!billingDetails.cardholderName.trim()) return
    if (!stripe || !elements) {
      return
    }

      const { error, paymentMethod } = await (stripe as any).createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: billingDetails.cardholderName
        },
      })
      if (error) {
        dispatch(addMessage({ message: "Error Creating Payment Method, Try Again!", type: "error"}));
      } else {
        const { id: pm_id } = paymentMethod;
        console.log(paymentMethod, "Payment Method ID");
        // Pay cart Amount
          payCartCourses({ pm_id, is_pm_save: saveCard });
        }
      }

  const StripeFieldsOptions = {
    style: {
      base: {
        color: "rgb(29,39,51)",
        "::placeholder": {
          color: "rgb(107, 114, 128)",
        },
      },
    },
  }

  return (
    <form onSubmit={handleSubmitCardDetails}>
      <div className="flex justify-center">
        <div className="mb-3 w-full">
          <label
            htmlFor="exampleFormControlInput2"
            className="form-label mb-2 inline-block text-sm text-maingray dark:text-gray-300"
          >
            Cardholder Name <sup>*</sup>
          </label>
          <input
            type="text"
            className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2.5 text-sm font-normal text-maingray transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none dark:border dark:border-gray-400 dark:bg-dark-color3 dark:text-white dark:placeholder:text-gray-300"
            id="exampleFormControlInput2"
            name="cardholderName"
            onChange={(e) =>
              setBillingDetails((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
            placeholder="Enter Cardholder Name"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="mb-3 w-full">
          <label
            htmlFor="card_number"
            className="form-label mb-2 inline-block text-sm text-maingray dark:text-gray-300"
          >
            Card Details <sup>*</sup>
          </label>
          <CardNumberElement
            options={StripeFieldsOptions}
            className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2.5 text-sm font-normal text-maingray transition ease-in-out focus:border-blue-600 focus:bg-white focus:!text-gray-700 focus:outline-none dark:border dark:border-gray-400 dark:bg-dark-color3 dark:placeholder:text-gray-200"
            id="card_number"
          />
        </div>
      </div>

      <div className="flex">
        <div className="mb-3 mr-4 w-1/2 lg:mr-1 xl:mr-4">
          <label
            htmlFor="card_expiry"
            className="form-label mb-2 inline-block text-sm text-maingray dark:text-gray-300"
          >
            Expiry <sup>*</sup>
          </label>
          <CardExpiryElement
            id="card_expiry"
            options={StripeFieldsOptions}
            className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2.5 text-sm font-normal text-maingray transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none dark:border dark:border-gray-400 dark:bg-dark-color3 dark:text-white dark:placeholder:text-gray-200"
          />
        </div>

        <div className="mb-3 ml-4 w-1/2 lg:ml-1 xl:ml-4">
          <label
            htmlFor="card_cvc"
            className="form-label mb-2 inline-block text-sm text-maingray dark:text-gray-300"
          >
            CVC <sup>*</sup>
          </label>
          <CardCvcElement
            id="card_cvc"
            options={StripeFieldsOptions}
            className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2.5 text-sm font-normal text-maingray transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none dark:border dark:border-gray-400 dark:bg-dark-color3 dark:text-white dark:placeholder:text-gray-200"
          />
        </div>
      </div>

      {/* Save Card checkbox */}
      <div className="mb-1 mt-3 flex items-center">
        <input
          type="checkbox"
          id="save-card"
          checked={saveCard}
          onChange={(e) => setSaveCard(e.target.checked)}
          className="h-3 w-3 default:ring-8 sm:h-3.5 sm:w-3.5 lg:h-3.5 lg:w-3.5"
        />
        <label htmlFor="save-card" className="pl-2 text-xs dark:text-white lg:text-sm ">
          Securely save my card for future payments
        </label>
      </div>
         <button onClick={()=> setShowPaymentForm(false)} className="mb-3 text-sm underline text-green-500 hover:text-green-300">Show saved payment methods</button>
        <BlackFilledButton
        disabled= {payCartCourse_isLoading}
        type="submit"
          endIcon={<FaArrowRight />}
        >
          Proceed to Pay
        </BlackFilledButton>
    </form>
  )
}

export default AddPaymentMethodForm
