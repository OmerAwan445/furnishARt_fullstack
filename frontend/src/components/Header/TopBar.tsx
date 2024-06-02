"use client";
import LOGO from "@/assets/logo/logo.svg";
import {
  Box,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import Image from "next/image";
import React from "react";
import AutoCompleteSearchbar from "../common/AutoCompleteSearchbar";
import { topFilms } from "@/DummyData";
import CartButton from "./CartButton";

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
    <Container maxWidth={"xl"} sx={{ p: "7px" }}>
      <Stack
        sx={{ width: "100%" }}
        direction="row"
        justifyContent={"space-between"}
      >
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <Image src={LOGO} className="w-28" alt="Logo" />
        </Typography>

          
          <Stack direction="row" justifyContent={"center"}>
          <TextField
            select
            value={category}
            onChange={handleCategoryChange}
            variant="outlined"
            size="small"
            type="search"
            style={{ width: "200px" }}
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          
          <AutoCompleteSearchbar suggestions={topFilms} />
            </Stack>
          
          <CartButton />

      </Stack>
    </Container>
  );
};

export default TopBar;
