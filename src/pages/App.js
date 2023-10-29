import "./App.css";
import React from "react";
import Navbar from "../components/navigation/Navbar";
import Tracker from "../components/tracker/Tracker";
import { Box } from "@mui/system";
import { useTheme } from "@emotion/react";
import ResponsiveAppBar from "../components/navigation/Appbar";
function App() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        height: "100vh",
      }}
    >
      <ResponsiveAppBar />
      <Tracker />
    </Box>
  );
}

export default App;
