"use client";

import '@/assets/css/Slider.css'
import { ItemCardProps } from "@/types/Types";
import { Box } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import ItemCard from "../common/ItemCards/ItemCard";
import CustomSwiperSlider from "../common/Sliders/CustomSwiperSlider";
import TitleHeadings from "../common/headings/TitleHeadings";

const BestSellers = ({ items }: { items: ItemCardProps[] }) => {

  const customBreakpoints = {
    640: {
      slidesPerView: 2,
      spaceBetween: 25,
    },
    800: {
      slidesPerView: 2,
      spaceBetween: 35,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 35,
    },
    1270: {
      slidesPerView: 3,
      spaceBetween: 25,
    },
  };

  return (
    <Box component="div" my={4}>
      <TitleHeadings>
        Best Sellers
      </TitleHeadings>
      <Box component="div" className="px-0 lg:px-10">
      <CustomSwiperSlider customBreakpoints={customBreakpoints} isCustomSlider>
        {
        items.map((item)=> 
        <SwiperSlide key={item.id}>
          <ItemCard item={item} />
        </SwiperSlide>
        )
      }
      </CustomSwiperSlider>
      </Box>
    </Box>
  );
};

export default BestSellers;
