import React from "react";
import CustomNavbar from "../../Header/CustomNavbar";
import TopBar from "../../Header/TopBar";
import { AppBar } from "@mui/material";

const NavbarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <AppBar sx={{ bgcolor: "white"}} position="sticky">
        <TopBar />
        <CustomNavbar />
      </AppBar>
      <div className="flex-grow flex">{children}</div>
    </div>
  );
};

export default NavbarLayout;
