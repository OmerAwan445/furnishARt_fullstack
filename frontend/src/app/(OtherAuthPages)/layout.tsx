import { ReactNode } from 'react';
import OtherAuthPagesFormImage from './OtherAuthPagesFormImage';


type Props = {
    children: ReactNode;
};

export default function RootLayout({ children }: Props) {
    return (
            <div className="flex max-h-[cacl(100vh-5rem)] items-center justify-center py-5 flex-wrap text-gray-800 max-w-8xl mx-auto">
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
    );
}

