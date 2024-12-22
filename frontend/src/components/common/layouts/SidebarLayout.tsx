'use client';

import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
    RiDashboardLine,
    RiShoppingCart2Line,
    RiUser3Line,
    RiAddFill,
    RiFileList3Line,
  } from "react-icons/ri";
import { IoIosLaptop } from 'react-icons/io';
import { BiHome, BiLeftArrow, BiMenu, BiRightArrow } from 'react-icons/bi';
import { usePathname } from 'next/navigation';
import { Avatar, Button, Menu, Stack, Tooltip } from '@mui/material';
import { stringAvatar } from '@/utils/others/avatarColor';
import { useSession } from 'next-auth/react';
import AuthService from '@/services/Auth';
import Link from 'next/link';

const drawerWidth = 240;
const settings = ["Profile", "Dashboard", "Logout"];


const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const location = usePathname();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { data } = useSession();
  
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuItems = [
      { label: "Dashboard", icon: <RiDashboardLine />, path: "/dashboard" },
      { label: "Categories", icon: <RiFileList3Line />, path: "/categories" },
      { label: "Add Category", icon: <RiAddFill />, path: "/categories/add" },
      { label: "All Furniture Items", icon: <IoIosLaptop />, path: "/products" },
      { label: "Add Furniture Item", icon: <RiAddFill />, path: "/products/add" },
      { label: "Orders", icon: <RiShoppingCart2Line />, path: "/orders" },
      { label: "Users", icon: <RiUser3Line />, path: "/users" },
      { label: "Home", icon: <BiHome />, path: "/" },
    ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <BiMenu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
          <Box className="ml-auto">
          <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar  {...stringAvatar(data?.user.first_name + " " + data?.user.last_name)} alt={data?.user.first_name + " " + data?.user.last_name} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Stack direction={"column"} gap={1}>
              {settings.map((setting) => (
                <Button key={setting} variant="text" sx={{ px: "20px" }} onClick={setting === "Logout" ? ()=> AuthService.signOutUser() : undefined}>
                <Typography textAlign="center">{setting}</Typography>
                </Button>
              ))}
              </Stack>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <BiRightArrow /> : <BiLeftArrow />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        {menuItems.map((item, index) => (
            <Link
            key={index}
            href={item.path}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                selected={location === item.path}
                sx={{
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  border: "1px solid #F0E6DC",
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
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: location === item.path ? theme.palette.background.default : theme.palette.text.primary,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label}
                primaryTypographyProps={{
                  fontSize: 16,
                  fontWeight: 500,
                }}
                 sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}

export default SidebarLayout;