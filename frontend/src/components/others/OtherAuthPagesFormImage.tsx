'use client';
import OtherAuthFormImg from "@/assets/Images/other-auth-form-image.jpeg";
import Image from 'next/image';

const OtherAuthPagesFormImage = () => {

    return (
        <div className="w-2/5 hidden lg:flex bg-login-bg-color 2xl:rounded-r-lg  2xl:rounded-bl-none">
            <div className="h-full max-h-screen">
                <Image height={0} width={0} className="h-full" src={OtherAuthFormImg} alt='' />
            </div>
        </div>
    )
}

export default OtherAuthPagesFormImage
