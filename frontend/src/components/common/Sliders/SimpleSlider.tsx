'use client';

import 'swiper/css';
import { FC, ReactNode } from 'react';
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper } from "swiper/react";

export interface SliderProps {
    children: ReactNode
    customBreakpoints?: any
  }

const SimpleSlider: FC<SliderProps> = ({
  children,
  customBreakpoints,
}) => {

  return (
    <div className="relative">
      <Swiper
        slidesPerView="auto"
        spaceBetween={10}
        allowTouchMove={false}
        breakpoints={
          customBreakpoints || {
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }
        }
        navigation={true}
        modules={[Navigation]}
        >
        {children}
      </Swiper>
    </div>
  )
}

export default SimpleSlider
