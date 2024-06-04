"use client";
import LOGO from "@/assets/logo/logo.svg";
import {
  Box,
  Container,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiCart } from "react-icons/bi";
import AutoCompleteSearchbar from "../common/AutoCompleteSearchbar";
import BlackOutlinedButton from "../common/buttons/BlackOutlinedButton";
import NavbarMobileIcons from "./NavbarMobileIcons";


const categories = [
  { value: "all", label: "All categories" },
  { value: "Table", label: "Table" },
  { value: "Desk", label: "Desk" },
  { value: "Decoration", label: "Decoration" },
  // Add more categories as needed
];
const TopBar = () => {
  const [category, setCategory] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleCategoryChange = (event: any) => {
    setCategory(event.target.value);
  };

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    console.log(`Searching for ${searchQuery} in ${category}`);
  };

  return (
    <Container maxWidth={"xl"} sx={{ p: "7px", height: "60px" }}>
      <Stack
        sx={{ width: "100%" }}
        direction="row"
        justifyContent={"space-between"}
      >
          <Link href="/" className="self-center">
          <Image src={LOGO} className="w-36" alt="Logo" />
          </Link>
          
          <Stack 
           sx={{ display: { xs:'none', md: 'flex' } }}
           direction="row" flex={1} justifyContent={"center"}>
          <TextField
            select
            value={category}
            onChange={handleCategoryChange}
            variant="outlined"
            size="small"
            type="search"
            style={{ width: "180px" }}
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          
          <AutoCompleteSearchbar />
            </Stack>

            <Box sx={{ display: { xs:'none', md: 'block',} }}>
            <BlackOutlinedButton className="!text-black hover:!text-white" startIcon={<BiCart />}>
              Cart
            </BlackOutlinedButton>
            </Box>

            <NavbarMobileIcons /> {/* shown below the md screen */}
      </Stack>
    </Container>
  );
};

export default TopBar;
