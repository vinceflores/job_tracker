import React, { useContext } from "react";

import { Link, useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import Person3Icon from "@mui/icons-material/Person3";
import HomeIcon from "@mui/icons-material/Home";
import { AuthenticationContext } from "../../controller/AuthContext";
import { auth } from "../../controller/firebase";
import navLogo from "../../Assets/navlogo.png";
import "../../pages/App.css";
import "./nav.css";
import useFormattedDate from "./useFormattedDate";
import { useTheme } from "@emotion/react";
import { Box } from "@mui/system";
import { NavButton } from "./NavButton";
import WorkIcon from "@mui/icons-material/Work";
import Button from "@mui/material/Button";
import { NavIconButton } from "./NavIconButton";
const Navbar = () => {
  const { authState, authDispatch } = useContext(AuthenticationContext);
  const [dropdown, setDropdown] = React.useState(false);

  const location = useLocation();
  const date = useFormattedDate();
  const theme = useTheme();
  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.nav,
        color: theme.palette.text.primary,
      }}
      className="nav-container"
    >
      <div className="flex gap-3 justify-start items-center">
        {location.pathname !== "/" ? (
          <Link to="/app" className="logo rounded">
            {/* <img src={navLogo} alt="logo" width={100} /> */}
            <Button
              startIcon={<WorkIcon fontSize="large" />}
              fontFamily={"Sans Serif"}
              variant="outlined"
            >
              <Typography
                variant="h6"
                fontFamily={"Sans Serif"}
                component="h3"
                sx={{ flexGrow: 1, color: theme.palette.text.secondary }}
              >
                Job Tracker
              </Typography>
            </Button>
          </Link>
        ) : (
          <Button
            startIcon={<WorkIcon fontSize="large" />}
            fontFamily={"Sans Serif"}
            variant="outlined"
          >
            <Typography
              variant="h6"
              fontFamily={"Sans Serif"}
              component="h3"
              sx={{ flexGrow: 1, color: theme.palette.text.secondary }}
            >
              Job Tracker
            </Typography>
          </Button>
        )}
      </div>
      {/* Desktop view */}
      <div className="nav-links ">
        <Typography
          variant="p"
          component="h3"
          sx={{ flexGrow: 1, color: theme.palette.text.secondary }}
        >
          {date}
        </Typography>
        {auth.currentUser && location.pathname !== "/" ? (
          <>
            <NavIconButton to="/app">
              <HomeIcon fontSize="inherit" />
            </NavIconButton>

            <NavIconButton to="/account">
              <Person3Icon fontSize="inherit" />
            </NavIconButton>

            <NavButton to="/" label={"Logout"} dispatch_type="LOGOUT" />
          </>
        ) : (
          <>
            <NavButton to="/login" label="Login" dispatch_type="LOGIN" />
            <NavButton to="/signup" label="Sign up" dispatch_type="LOGIN" />
          </>
        )}
      </div>

      {/* Mobile view */}
      {/* <div className="nav-links-mobile ">
        <Typography
          variant="p"
          component="h3"
          sx={{ flexGrow: 1, color: theme.palette.text.secondary }}
        >
          {date}
        </Typography>
        {auth.currentUser && location.pathname !== "/" ? (
          <>
            <NavIconButton to="/app">
              <HomeIcon fontSize="inherit" />
            </NavIconButton>

            <NavIconButton to="/account">
              <Person3Icon fontSize="inherit" />
            </NavIconButton>

            <NavButton to="/" label={"Logout"} dispatch_type="LOGOUT" />
          </>
        ) : (
          <>
            <NavButton to="/login" label="Login" dispatch_type="LOGIN" />
            <NavButton to="/signup" label="Sign up" dispatch_type="LOGIN" />
          </>
        )}
      </div> */}
    </Box>
  );
};

export default Navbar;
