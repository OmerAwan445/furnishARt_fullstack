import Image from "next/image";
import React from "react";
import FormSideImg from "@/assets/Images/form-side-image.jpg";
import { FaCompass, FaLightbulb, FaPaintBrush, FaShoppingCart } from "react-icons/fa";

const textLogoList = [
    {
        text: "Visualize and Design",
        Logo: FaPaintBrush
    },
    {
        text: "Explore and Interact",
        Logo: FaCompass
    },
    {
        text: "Empower Your Choices",
        Logo: FaLightbulb
    },
    {
        text: "Seamless Experience for Shoppers",
        Logo: FaShoppingCart
    },
]

const AuthPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-white flex flex-col min-h-screen">
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2">
        <div>{children}</div>
        <div className="relative min-h-full px-4 pb-10 pt-60 sm:pb-16 lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
          <div className="absolute  inset-0">
            <Image
              className="object-cover object-top w-full h-full"
              src={FormSideImg}
              alt="Auth Image"
              width={1000}
              height={1000}
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

          <div className="relative">
            <div className="w-full max-w-2xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
              <h3 className="text-3xl xl:text-4xl font-bold text-white">
                Join 35k+ Happy Customers & <br className="hidden xl:block" />
                Revolutionize Your Furniture Shopping Experience
              </h3>
              <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                {textLogoList.map((el) => {
                return <TextAndLogo key={el.text} {...el} />
                } )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function TextAndLogo({ text, Logo }: { text: string, Logo: React.ComponentType<{ className?: string }> }) {
    return (
      <li className="flex items-center space-x-3">
        <div className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full">
          <Logo className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="xl:text-lg font-medium text-white">
          {text}
        </span>
      </li>
    );
  }

export default AuthPageLayout;
