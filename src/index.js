import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter } from "react-router-dom";
import AuthContext from "./controller/AuthContext";
import Paths from "./controller/Paths";
import AppContext from "./controller/AppContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContext>
      <AppContext>
        <Paths />
      </AppContext>
    </AuthContext>
  </BrowserRouter>
);
