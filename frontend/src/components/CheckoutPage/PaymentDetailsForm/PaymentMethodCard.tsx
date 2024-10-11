import MasterCard from "@/assets/Images/payment/master-card.svg";
import Visa from '@/assets/Images/payment/visa.svg';
import { PaymentMethodCardProps } from '@/types/Types';
import Image from "next/image";

export default function PaymentMethodCard({checkedCardId, setCheckedCardId, cardDetails}: PaymentMethodCardProps) {
    return (
    <button onClick={()=> setCheckedCardId(cardDetails.id)} className=" xl:my-2.5 my-2 xl:px-1.5 px-3 xl:py-2 py-3 bg-white  dark:bg-dark-color3 lg:py-2 rounded-md border-2 border-gray-300 hover:border-price w-full">
    <div className="wrapper flex antialiased items-center ">
        <div className="xl:w-2/12 w-1/12 mr-2">
            <div className="form-group form-check xl:ml-3 ">
                <input type="radio" name='radio-option'
                checked={checkedCardId === cardDetails.id}
                onChange={()=> setCheckedCardId(cardDetails.id)}
                    className="xl:h-6 xl:w-6 h-5 w-5 cursor-pointer rounded-full text-price bg-gray-100 dark:bg-gray-600 border-gray-300 focus:ring-price" />
            </div>
        </div>

        <div className="w-2/12 border-gray-200 dark:bg-white p-1 border-2 justify-center flex rounded-md xl:m-1 mr-2 lg:mr-0">
            <Image height={0} width={0}
                className="h-7" src={cardDetails.brand === "visa" ? Visa : MasterCard  } alt="Visa" />
        </div>

        <div className="xl:w-6/12 w-7/12">
                <div className="w-full text-start">
                    <h4 className="xl:mt-1 lg:ml-2 lg:text-sm lg:font-medium leading-tight text-cart-item-title dark:text-white">
                        {cardDetails.name}
                    </h4>
                    <h4 className="xl:mt-0.5 lg:ml-2 lg:text-sm xl:font-medium leading-tight text-cart-item-title dark:text-white">
                        **** **** **** {cardDetails.last4}
                    </h4>
            </div>
        </div>

        <div className="lg:w-2/12 xl:pr-2">
            <div className="flex flex-wrap">
                <div className="w-full">
                    <div className="flex xl:justify-end">
                        <span className="text-maingray xl:text-lg lg:text-sm xl:mr-2 xl:font-medium">Exp</span>
                    </div>
                </div>
            </div>

            <div className="flex w-full flex-wrap xl:mt-0 xl:justify-end">
                <h6 className="text-gray-500 lg:text-xs xl:mr-3 mr-2 font-semibold dark:text-white">*{cardDetails.exp_year}</h6>
            </div>
        </div>
    </div>
    </button>
  )
}
