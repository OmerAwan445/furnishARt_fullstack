"use client";

import '@/assets/css/Slider.css'
import { ItemCardProps } from "@/types/Types";
import { Box } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import ItemCard from "../common/ItemCards/ItemCard";
import CustomSwiperSlider from "../common/Sliders/CustomSwiperSlider";
import TitleHeadings from "../common/headings/TitleHeadings";

const BestSellers = ({ items }: { items: ItemCardProps[] }) => {
  return (
    <Box mt={4}>
      <TitleHeadings>
        Best Sellers
      </TitleHeadings>
      <Box className="px-0 lg:px-10">
      <CustomSwiperSlider isCustomSlider>
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
