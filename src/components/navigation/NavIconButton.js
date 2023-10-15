import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import { useTheme } from "@emotion/react";

export const NavIconButton = ({ children, to }) => {
  const location = useLocation();
  const theme = useTheme();

  return (
    <Link to={to}>
      <Button
        aria-label="home"
        size="large"
        sx={{
          color:
            location.pathname === to
              ? theme.palette.primary.main
              : theme.palette.secondary.main,
        }}
      >
        {children}
      </Button>
    </Link>
  );
};
