'use client';

import React from 'react';
import { Box, Card, CardMedia } from '@mui/material';
import CustomSwiperSlider from '../common/Sliders/CustomSwiperSlider';
import { SwiperSlide } from 'swiper/react';
import SimpleSlider from '../common/Sliders/SimpleSlider';

const FurnitureItemImages = ({ images }: { images: string[] }) => {
  const customBreakpoints = {
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
  }
    return (
    <Box>
      {/* <Card>
        <CardMedia
          component="img"
          height="330"
          image={images[0]}
          alt="Product Image"
        />
      </Card> */}
      <Box mt={2}>
        <SimpleSlider customBreakpoints={customBreakpoints}>
          {images.map((image, index) => (
            <SwiperSlide key={index} className='w-full'>
            <Box>
              <Card>
                <CardMedia
                  component="img"
                  height="100"
                  image={image}
                  alt={`Product Image ${index + 1}`}
                />
              </Card>
            </Box>
            </SwiperSlide>
          ))}
        </SimpleSlider>
      </Box>
    </Box>
  );
};

export default FurnitureItemImages;
