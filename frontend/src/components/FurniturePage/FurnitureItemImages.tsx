'use client';

import { Box, Card, CardMedia } from '@mui/material';
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
  };

  return (
    <Box className="!drop-shadow-primary">
      <SimpleSlider customBreakpoints={customBreakpoints}>
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Box sx={{ maxHeight: 700, overflow: 'hidden', borderRadius: '15px' }}>
              <Card sx={{ maxHeight: 700,
                // filter: 'brightness(0.98)',
                // transition: 'filter 0.3s',
              }}>
                <CardMedia
                  component="img"
                  sx={{ maxHeight: 700,
                    objectFit: 'cover',}}
                  image={image}
                  alt={`Product Image ${index + 1}`}
                />
              </Card>
            </Box>
          </SwiperSlide>
        ))}
      </SimpleSlider>
    </Box>
  );
};

export default FurnitureItemImages;
