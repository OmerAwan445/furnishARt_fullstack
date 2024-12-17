import { ReactNode } from "react";
import OtherAuthPagesFormImage from "@/components/others/OtherAuthPagesFormImage";
import ClientSideSnackbar from "@/components/common/toasts/ClientSideSnackbar";

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <>
      <ClientSideSnackbar />
      <div className="flex max-h-[calc(100vh-(60px+65px))] items-center justify-center py-5 flex-wrap text-gray-800 max-w-8xl mx-auto w-full">
        <div className="w-full md:w-10/12 lg:w-10/12 mx-auto">
          <div className="block bg-white md:shadow-lg md:rounded-md lg:rounded-none">
            <div className="flex flex-wrap">
              <OtherAuthPagesFormImage />
              <div className="w-full lg:w-3/5 rounded-md lg:rounded-none px-2 md:bg-white sm:px-8 md:px-10 xl:px-16 py-4 lg:py-6">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
