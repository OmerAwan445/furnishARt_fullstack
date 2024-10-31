'use client';

import { Box, Card, CardMedia } from '@mui/material';
import { SwiperSlide } from 'swiper/react';
import SimpleSlider from '../common/Sliders/SimpleSlider';
import Scene3DModel from './3DModel/Scene3DModel';

const FurnitureImagesAnd3DModel = ({ images, modelUrl } : { modelUrl  : string | null, images: string[] }) => {
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
    <Box component="div" className="!drop-shadow-primary">
      <SimpleSlider  customBreakpoints={customBreakpoints}>
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Box component="div" sx={{ height: 600, overflow: 'hidden', borderRadius: '15px' }}>
              <Card sx={{ height: 600,
                // filter: 'brightness(0.98)',
                // transition: 'filter 0.3s',
              }}>
                <CardMedia
                  component="img"
                  sx={{ height: 600,
                    objectFit: 'cover',}}
                  image={image}
                  alt={`Product Image ${index + 1}`}
                />
              </Card>
            </Box>
          </SwiperSlide>
        ))}
        {modelUrl && <SwiperSlide>
          <Scene3DModel modelUrl={modelUrl} />
        </SwiperSlide>}
      </SimpleSlider>
    </Box>
  );
};

export default FurnitureImagesAnd3DModel;
