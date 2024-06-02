import React from "react";
import CustomNavbar from "../../Header/CustomNavbar";
import TopBar from "../../Header/TopBar";

const NavbarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <CustomNavbar />
      <div className="flex-grow flex">{children}</div>
    </div>
  );
};

export default NavbarLayout;
