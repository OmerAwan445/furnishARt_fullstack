import MasterCard from "@/assets/Images/payment/master-card.svg"
import Visa from "@/assets/Images/payment/visa.svg"
import Image from "next/image"

export default function PaymentInstructions() {

  return (
    <div className="mb-4">
      <div className="justify-start">
        <h4 className="mb-1 mt-5 text-2xl font-medium text-maingray dark:text-white">
        Payment Details
        </h4>
        <h6 className="text-xs font-light text-maingray dark:text-white lg:dark:text-gray-400">
        Complete your purchase by providing payment details
        </h6>
      </div>

      <div className="mt-4 flex flex-wrap">
        <div className="flex w-full">
          <div className="m-1 flex w-2/12 justify-center rounded-md border-2 border-gray-200 hover:border-price dark:bg-white">
            <Image width={0} height={0} className="h-10 pb-1 pl-2 pr-2 pt-1" src={Visa} alt="Visa Card" />
          </div>
          <div className="m-1 flex w-2/12 justify-center rounded-md border-2 border-gray-200 hover:border-price dark:bg-white">
            <Image
              width={0}
              height={0}
              className="h-10 pb-1 pl-2 pr-2 pt-1"
              src={MasterCard}
              alt="Master Card"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
