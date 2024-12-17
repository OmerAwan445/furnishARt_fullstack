import { Box } from "@mui/material";
import React from "react";

const DeniedPage = () => {
  return (
    <Box className="flex flex-col w-full items-center justify-center bg-red-100 text-red-700 text-center">
      <h1 className="text-5xl mb-4">Access Denied</h1>
      <p className="text-2xl">You do not have permission to view this page.</p>
    </Box>
  );
};

export default DeniedPage;
