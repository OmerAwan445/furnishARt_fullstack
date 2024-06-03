'use client';

import React from 'react'
import { Box, IconButton } from '@mui/material';
import { BiSearch } from 'react-icons/bi';
import { BiCart } from "react-icons/bi";
import theme from '@/utils/theme';

const NavbarMobileIcons = () => {
  return (
    <Box sx={{ display: {
        xs: 'flex', md: 'none'
        }, alignItems: 'center' }}>
      <IconButton aria-label="search">
        <BiSearch color={theme.palette.primary.light} />
      </IconButton>
      <IconButton aria-label="cart">
        <BiCart color={theme.palette.primary.light}/>
      </IconButton>
    </Box>
  )
}

export default NavbarMobileIcons
