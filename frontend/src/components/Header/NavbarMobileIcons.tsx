'use client';

import React from 'react'
import { Box, IconButton } from '@mui/material';
import { BiSearch } from 'react-icons/bi';
import { BiCart } from "react-icons/bi";
import theme from '@/utils/theme';
import Link from 'next/link';

const NavbarMobileIcons = () => {
  return (
    <Box component="div" sx={{ display: {
        xs: 'flex', md: 'none'
        }, alignItems: 'center' }}>
      <IconButton aria-label="search">
        <BiSearch color={theme.palette.primary.light} />
      </IconButton>
      <Link href="/cart" passHref>
      <IconButton aria-label="cart">
        <BiCart color={theme.palette.primary.light}/>
      </IconButton>
      </Link>
    </Box>
  )
}

export default NavbarMobileIcons
