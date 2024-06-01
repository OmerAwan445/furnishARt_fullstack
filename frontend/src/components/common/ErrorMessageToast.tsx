
import { Toast, ToastToggle } from 'flowbite-react';
import { MdError } from "react-icons/md";

export function ErrorMessageToast({ errorMessage, setErrorMessage }:{ errorMessage:string, setErrorMessage:React.Dispatch<React.SetStateAction<string>> }) {
    if(!errorMessage) return null;

    return (
     <Toast theme={{
        "root": {
            "base": "flex w-full max-w-md mb-2 items-center rounded-lg bg-[#FA838F] p-2.5 text-white shadow-md dark:bg-dark-color5 dark:text-gray-300",
          },
          "toggle": {
            "base": "ml-auto inline-flex rounded-full justify-center items-center text-white hover:text-dark-color1 dark:text-white ",
            "icon": "h-4 w-4 shrink-0"
          }
      }}>
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-200 text-alert dark:text-red-200 dark:bg-alert ">
        <MdError className="h-5 w-5" />
      </div>
      <div className="ml-3 text-sm font-normal">{errorMessage}</div>
      <ToastToggle onDismiss={() => setErrorMessage('')} />
    </Toast>

  );
}
