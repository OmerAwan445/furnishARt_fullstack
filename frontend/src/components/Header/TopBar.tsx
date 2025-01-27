"use client";
import LOGO from "@/assets/logo/logo.svg";
import { Box, Container, MenuItem, Stack, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { BiCart } from "react-icons/bi";
import AutoCompleteSearchbar from "../common/AutoCompleteSearchbar";
import BlackOutlinedButton from "../common/buttons/BlackOutlinedButton";
import NavbarMobileIcons from "./NavbarMobileIcons";
import CategorySvs from "@/services/Category";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { CategoryActions } from "@/store/Slices/CategorySlice";

/* const categories = [
  { value: "all", label: "All categories" },
  { value: "Table", label: "Table" },
  { value: "Desk", label: "Desk" },
  { value: "Decoration", label: "Decoration" },
  // Add more categories as needed
]; */

const TopBar = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((store) => store.categories);
  const { AddCategories } = CategoryActions;
  const [selectedCategory, setSelectedCategory] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState("");
  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedCategory(event.target.value as number);
    console.log(`Searching for ${searchQuery} in category ${selectedCategory}`);
  };

  useEffect(() => {
    (async () => {
      const data = await CategorySvs.getCategories();
      if (!data) return;
      dispatch(
        AddCategories([
          { value: 0, label: "All categories" },
          ...data.map((cat) => ({ value: cat.id, label: cat.name })),
        ])
      );
    })();
  }, []);

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
          sx={{ display: { xs: "none", md: "flex" } }}
          direction="row"
          flex={1}
          justifyContent={"center"}
        >
          <TextField
            select
            onChange={handleCategoryChange}
            variant="outlined"
            size="small"
            value={selectedCategory}
            style={{ width: "180px" }}
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <AutoCompleteSearchbar
            selectedCategoryId={Number(selectedCategory)}
          />
        </Stack>
        <a
          href="/furnishart-app.apk" target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block mr-5 border border-green-700 rounded-lg px-3 py-2 focus:outline-none bg-green-500 hover:text-green-700 hover:bg-transparent text-white text-sm lg:text-base transition">
          Download App
        </a>
        <Link href={"/cart"} prefetch>
          <Box component="div" sx={{ display: { xs: "none", md: "block" } }}>
            <BlackOutlinedButton
              className="!text-black hover:!text-white"
              startIcon={<BiCart />}
            >
              Cart
            </BlackOutlinedButton>
          </Box>
        </Link>
        <NavbarMobileIcons /> {/* shown below the md screen */}
      </Stack>
    </Container>
  );
};

export default TopBar;
