import FormSideImg from "@/assets/Images/form-side-image.jpg";
import Image from "next/image";
import React from "react";
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
  const car ="80px";
  return (
    <section className={`bg-white w-full min-h-[calc(100vh-(60px+65px))] overflow-hidden pt-2 grid grid-cols-1 lg:grid-cols-2 `}>
        {children}
        <div className="hidden lg:block relative px-4 pb-10 pt-60 sm:pb-16 lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
          <div className="absolute  inset-0">
            <Image
              className="object-cover object-top w-full h-full"
              src={FormSideImg}
              alt="Auth Image"
              width={0}
              height={0}
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

          <div className="relative flex justify-center items-center">
            <div className="w-full max-w-2xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
                <h1 className="text-5xl xl:text-6xl font-bold text-white mb-5">furnishArt</h1>
              <h3 className="text-3xl xl:text-4xl font-bold text-white">
                Furnish your imagaination
              </h3>
              <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                {textLogoList.map((el) => {
                return <TextAndLogo key={el.text} {...el} />
                } )}
              </ul>
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
