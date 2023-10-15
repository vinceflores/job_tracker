import React, {useContext} from "react";
import { Link } from "react-router-dom";
import {  Button } from "@mui/material";
import { auth } from "../controller/firebase";
import { AuthenticationContext } from "../controller/AuthContext";
import Navbar from "../components/navigation/Navbar";
import AppBar from "../components/navigation/Appbar";

const Home = () => {
  const {authState, authDispatch} = useContext(AuthenticationContext)
  
  return (
    <div>
      <AppBar />  
      
    
    </div>
  );
};

export default Home;
