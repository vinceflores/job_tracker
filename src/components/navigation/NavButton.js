import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Login, Logout } from "@mui/icons-material";
import { AuthenticationContext } from "../../controller/AuthContext";
import { useTheme } from "@emotion/react";

export const NavButton = ({ to, dispatch_type, label }) => {
  const { authDispatch } = useContext(AuthenticationContext);
  const theme = useTheme();
  const [icon, setIcon] = useState();

  useEffect(() => {
    setIcon(startIcon());
  }, [dispatch_type]);

  const startIcon = () => {
    switch (dispatch_type) {
      case "LOGOUT":
        return <Logout fontSize="small" />;
      case "LOGIN":
        return <Login fontSize="small" />;
      default:
        return <Logout fontSize="small" />;
    }
  };

  const handleClick = () => {
    switch (dispatch_type) {
      case "LOGOUT":
        return () => authDispatch({ type: dispatch_type });
      default:
        return () => {};
    }
  };

  return (
    <Link to={to}>
      <Button
        onClick={handleClick}
        size="small"

        sx={{
          color: theme.palette.text.nav_button,
          // bgcolor: theme.palette.secondary.main,
        }}
      >
        {label}
      </Button>
    </Link>
  );
};
