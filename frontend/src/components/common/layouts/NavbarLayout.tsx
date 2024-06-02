import React from "react";
import { CustomNavbar } from "../CustomNavbar";

const NavbarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <CustomNavbar />
      <div className="flex-grow flex">{children}</div>
    </div>
  );
};

export default NavbarLayout;
