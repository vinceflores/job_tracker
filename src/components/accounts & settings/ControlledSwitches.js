import React, { useEffect } from "react";
import { Switch } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useContext } from "react";
import { AuthenticationContext } from "../../controller/AuthContext";

export function ControlledSwitches() {
  const [checked, setChecked] = React.useState(
    localStorage.getItem("mode") === "light"
  );

  const { authState, authDispatch, colorMode } = useContext(
    AuthenticationContext
  );
  const handleChange = (event) => {
    setChecked(event.target.checked);
    colorMode.toggleColorMode();
  };

  useEffect(() => {
    if (localStorage.getItem("mode") === "light") {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }, [authState.mode]);

  return (
    <div className="flex justify-center items-center gap-3">
      {/* {checked ? <LightModeIcon /> : ""} */}
      <Switch
        size="large"
        checked={checked}
        startIcon={<LightModeIcon />}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
      {/* {!checked ? <DarkModeIcon /> : ""} */}
    </div>
  );
}
