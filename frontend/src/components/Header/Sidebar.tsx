"use client";

import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import {
  RiDashboardLine,
  RiShoppingCart2Line,
  RiUser3Line,
  RiAddFill,
  RiFileList3Line,
} from "react-icons/ri";
import { IoIosLaptop } from "react-icons/io";
import logo from "@/assets/logo/logo.svg";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  const location = usePathname();
  const theme = useTheme();

  const menuItems = [
    { label: "Dashboard", icon: <RiDashboardLine />, path: "/dashboard" },
    { label: "Categories", icon: <RiFileList3Line />, path: "/categories" },
    { label: "Add Category", icon: <RiAddFill />, path: "/categories/add" },
    { label: "Products", icon: <IoIosLaptop />, path: "/products" },
    { label: "Add Product", icon: <RiAddFill />, path: "/products/add" },
    { label: "Orders", icon: <RiShoppingCart2Line />, path: "/orders" },
    { label: "Users", icon: <RiUser3Line />, path: "/users" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#fff",
        },
      }}
    >
      {/* Logo Section */}
      <Link href={"/dashboard"}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "20vh",
          flexDirection: "column",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        <Image src={logo} alt="Logo" className="w-44"/>
      </Box>
      </Link>

      {/* Navigation Links */}
      <List>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem disablePadding>
              <ListItemButton
                selected={location === item.path}
                className="!rounded-lg"
                sx={{
                  border: "2px solid #F0E6DC",
                  padding: 1,
                  marginX: 1,
                  mb: 1,
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.primary.main,
                    color: "#fff",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: theme.palette.secondary.main,
                    color: "#fff",
                  },
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                    color: "#fff",
                  },
                }}
              >
                <ListItemIcon
                className="text-xl"
                  sx={{
                    color: location === item.path ? theme.palette.background.default : theme.palette.text.primary,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>

      {/* Footer */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          textAlign: "center",
          padding: 2,
          borderTop: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="body2" color="textSecondary">
          © Copyright furnishARt Inc.
        </Typography>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
