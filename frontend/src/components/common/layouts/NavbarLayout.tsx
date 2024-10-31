import React from "react";
import CustomNavbar from "../../Header/CustomNavbar";
import TopBar from "../../Header/TopBar";
import { AppBar, Box } from "@mui/material";
import Footer from "@/components/Footer";

const NavbarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box component="div" className="flex flex-col min-h-screen overflow-x-hidden">
      <AppBar sx={{ bgcolor: "white"}} position="sticky">
        <TopBar />
        <CustomNavbar />
      </AppBar>
      <Box component="div" className="flex-grow flex">{children}</Box>
      <footer>
        <Footer />
      </footer> 
    </Box>
  );
};

export default NavbarLayout;
