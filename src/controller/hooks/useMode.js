import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

// Get the systems prefered mode
const preferedMode = () => {
  const localMode = localStorage.getItem("mode");
  if (localMode) {
    return localMode;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

// Hook for using the theme mode
const useMode = () => {
  const [mode, setMode] = useState(preferedMode());
  const locaiton = useLocation();

  useEffect(() => {
    if (
      locaiton.pathname === "/" ||
      locaiton.pathname === "/login" ||
      locaiton.pathname === "/signup"
    ) {
      setMode("light");
    } else{
      setMode(preferedMode());
    }
  }, [locaiton.pathname]);


  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => {
          localStorage.setItem("mode", prevMode === "light" ? "dark" : "light");
          return (prevMode === "light" ? "dark" : "light")
        });
      },
    }),
    []
  );

  return [mode, colorMode];
};

export default useMode;
