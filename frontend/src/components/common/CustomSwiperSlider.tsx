'use client';

import 'swiper/css';
import '@/assets/css/Slider.css'
import { FC, ReactNode } from 'react';
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper } from "swiper/react";

export interface SliderProps {
    children: ReactNode
    customBreakpoints?: any
  }

const CustomSwiperSlider: FC<SliderProps> = ({
  children,
  customBreakpoints,
}) => {

  return (
    <div className="relative">
      <Swiper
        slidesPerView="auto"
        spaceBetween={10}
        draggable={true}
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
        grabCursor={true}
        modules={[Navigation]}
        className='custom-Slider mySwiper !static'
        >
        {children}
      </Swiper>
    </div>
  )
}

export default CustomSwiperSlider
