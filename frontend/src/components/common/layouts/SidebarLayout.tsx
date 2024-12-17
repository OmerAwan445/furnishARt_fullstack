import Sidebar from "@/components/Header/Sidebar";
import { Box, Grid } from "@mui/material";
import React from "react";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className="w-full">
      <Grid container>
        {/* Sidebar */}
        <Grid item xs={6} md={4} lg={2} className="">
          <Sidebar />
        </Grid>

        {/* Main Content */}
        <Grid item xs={6} md={8} lg={10} className="p-5 text-left">
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SidebarLayout;
