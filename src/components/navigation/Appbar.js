import { useState } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { useContext } from "react";
import { AuthenticationContext } from "../../controller/AuthContext";
import { useLocation } from "react-router-dom";
import { NavButton } from "./NavButton";
import { auth } from "../../controller/firebase";
import { useTheme } from "@emotion/react";
import { NavIconButton } from "./NavIconButton";
import { useMediaQuery } from "@mui/material";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Home", "Account"];
const user = ["Login", "Sign Up", "Logout"];
function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const location = useLocation();
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:897px)");
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      sx={{
        bgcolor: theme.palette.background.nav,
        color: theme.palette.text.primary,
      }}
      position="static"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
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
            JobTracker
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {location.pathname !== "/" && (
                <div className="flex flex-col">
                  <NavIconButton to="/app">
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">Home</Typography>
                    </MenuItem>
                  </NavIconButton>
                  <NavIconButton to="/account">
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">Account</Typography>
                    </MenuItem>
                  </NavIconButton>
                </div>
              )}
              {location.pathname === "/" && (
                <div className="flex flex-col gap-2 items-center ">
                  <NavButton to="/login" label="Login" dispatch_type="LOGIN" />
                  <NavButton
                    to="/signup"
                    label="Sign up"
                    dispatch_type="LOGIN"
                  />
                </div >
              )}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            JobTracker1
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* <NavIconButton to="/app">
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
            </NavIconButton>
            <NavIconButton to="/account">
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Account</Typography>
              </MenuItem>
            </NavIconButton> */}
            {location.pathname !== "/" && (
              <>
                <NavIconButton to="/app">
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Home</Typography>
                  </MenuItem>
                </NavIconButton>
                <NavIconButton to="/account">
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Account</Typography>
                  </MenuItem>
                </NavIconButton>
              </>
            )}
          </Box>

          <Box sx={{ display: {  md: "flex" } }}>
            {auth.currentUser && location.pathname !== "/" ? (
              <>
                <NavButton to="/" label={"Logout"} dispatch_type="LOGOUT" />
              </>
            ) : (
              <div className="flex gap-3">
                {
                  !matches ?  (
                    <>
                      <NavButton to="/login" label="Login" dispatch_type="LOGIN" />
                      <NavButton to="/signup" label="Sign up" dispatch_type="LOGIN" />
                    </>
                  ): ""
                }
       
              </div>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
