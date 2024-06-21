"use client";

import { ItemCardProps } from "@/types/Types";
import { Box, Typography } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import CustomSwiperSlider from "../common/Sliders/CustomSwiperSlider";
import ItemCard from "../common/ItemCards/ItemCard";

const BestSellers = ({ items }: { items: ItemCardProps[] }) => {
  return (
    <Box mt={4}>
      <Typography variant="h3" fontWeight={500} sx={{ mb: 2 }}>
        Best Sellers
      </Typography>
      <Box className="px-0 lg:px-10">
      <CustomSwiperSlider>
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
