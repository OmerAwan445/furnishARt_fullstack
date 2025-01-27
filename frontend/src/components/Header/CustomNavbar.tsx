"use client";

import AuthSvs from "@/services/Auth";
import { stringAvatar } from "@/utils/others/avatarColor";
import theme from "@/utils/theme";
import { Divider, Drawer, Menu, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import DefaultButton from "../common/buttons/DefaultButton";
import { usePathname } from "next/navigation";

const pages = ["Home", "Shop", "About", "Contact us"];
const settings = ["Profile", "Account", "Logout"];

function CustomNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { data } = useSession();
  const pathname = usePathname();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setDrawerOpen(open);
    };

  return (
    <Box
      component="div"
      sx={{
        height: "65px",
        width: "100%",
        bgcolor: theme.palette.primary.main,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <IconButton
              size="large"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <BiMenu />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              sx={{
                "& .MuiDrawer-paper": {
                  width: "250px",
                  backgroundColor: "background.default",
                },
              }}
            >
              <Box
                component="div"
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <Typography
                  variant="h6"
                  sx={{
                    py: 2,
                    mb: 2,
                    textAlign: "center",
                    color: "#fff",
                    backgroundColor: theme.palette.background.black,
                  }}
                >
                  Menu
                </Typography>
                <Divider />
                <Stack direction="column">
                  {pages.map((page) => (
                    <Link
                      key={page}
                      href={`/${
                        page === "Home"
                          ? ""
                          : page.toLowerCase().replace(" ", "-")
                      }`}
                      passHref
                    >
                      <Button
                        color="inherit"
                        key={page}
                        onClick={toggleDrawer(false)}
                        sx={{
                          width: "100%",
                          py: 1,
                          backgroundColor:
                            pathname ===
                            `/${
                              page === "Home"
                                ? ""
                                : page.toLowerCase().replace(" ", "-")
                            }`
                              ? theme.palette.background.accent
                              : "transparent",
                          color:
                            pathname ===
                            `/${
                              page === "Home"
                                ? ""
                                : page.toLowerCase().replace(" ", "-")
                            }`
                              ? theme.palette.primary.contrastText
                              : theme.palette.text.primary,
                          "&:hover": {
                            backgroundColor: theme.palette.background.accent,
                            color: theme.palette.primary.contrastText,
                          },
                          borderRadius: 0,
                        }}
                      >
                        {page}
                      </Button>
                      <Divider />
                    </Link>
                  ))}
                  <a
                    href="/furnishart-app.apk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-auto mt-5 border border-green-700 rounded-lg px-3 py-2 focus:outline-none bg-green-500 hover:text-green-700 hover:bg-transparent text-white transition"
                  >
                    Download App
                  </a>
                </Stack>
              </Box>
            </Drawer>
          </Box>

          <Box
            component="div"
            sx={{
              flexGrow: 1,
              alignItems: "center",
              display: { xs: "none", md: "flex" },
            }}
          >
            <Container fixed>
              <Stack
                direction={{ sm: "row" }}
                divider={
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      backgroundColor: "white",
                      height: "25px",
                      margin: "auto 0",
                    }}
                  />
                }
                justifyContent={"space-between"}
              >
                {pages.map((page) => (
                  <Link
                    key={page}
                    href={`/${
                      page === "Home"
                        ? ""
                        : page.toLowerCase().replace(" ", "-")
                    }`}
                  >
                    <Typography
                      className={`relative py-2 text-white hover:text-gray-300 transition-all duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-white after:scale-x-0 after:origin-left after:transition-transform after:duration-200 hover:after:scale-x-100 hover:border-white ${
                        pathname ===
                        `/${
                          page === "Home"
                            ? ""
                            : page.toLowerCase().replace(" ", "-")
                        }`
                          ? "after:scale-x-100"
                          : ""
                      }`}
                    >
                      {page}
                    </Typography>
                  </Link>
                ))}
              </Stack>
            </Container>
          </Box>

          <Box component="div" sx={{ flexGrow: 0 }}>
            {data ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      {...stringAvatar(
                        data.user.first_name + " " + data.user.last_name
                      )}
                      alt={data.user.first_name + " " + data.user.last_name}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px", zIndex: 100 }}
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
                    {data.user.role === "ADMIN" && (
                      <Link href="/dashboard" passHref>
                        <Button variant="text" sx={{ px: "20px" }}>
                          <Typography textAlign="center">Dashbord</Typography>
                        </Button>
                      </Link>
                    )}
                    {settings.map((setting) => (
                      <Button
                        key={setting}
                        variant="text"
                        sx={{ px: "20px" }}
                        onClick={
                          setting === "Logout"
                            ? () => AuthSvs.signOutUser()
                            : undefined
                        }
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </Button>
                    ))}
                  </Stack>
                </Menu>
              </>
            ) : (
              <Link href="/login" passHref>
                <DefaultButton className="!px-7">Login</DefaultButton>
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>
    </Box>
  );
}

export default CustomNavbar;
