import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import bannerImg from '@/assets/Images/banner.png'; // Adjust the path to your image

const Banner = () => {
  return (
    <Box component="div"
      position="relative"
      width="100%"
      height={{ xs: '400px', sm: '500px', md: '700px' }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <Image
        src={bannerImg}
        alt="Banner Image"
        layout="fill"
        objectFit="cover"
        style={{ zIndex: -1 }}
      />
      <Typography
        variant="h2"
        component="div"
        fontWeight={500}
        sx={{
          color: 'white',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
          textAlign: 'center',
          padding: { xs: '10px', sm: '20px', md: '30px' },
          fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' },
        }}
      >
        Welcome to Our Website
      </Typography>
    </Box>
  );
};

export default Banner;
