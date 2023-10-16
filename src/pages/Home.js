import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, useMediaQuery } from "@mui/material";
import { auth } from "../controller/firebase";
import { AuthenticationContext } from "../controller/AuthContext";
import Navbar from "../components/navigation/Navbar";
import AppBar from "../components/navigation/Appbar";
import assets from "../Assets/assets";
import { Typography } from "@mui/material";
import "../index.css";
import { CardMedia } from "@mui/material";
import Footer from "../components/landing/Footer";
import { Features } from "../components/landing/Features";

const Home = () => {
  const { authState, authDispatch } = useContext(AuthenticationContext);
  const small = useMediaQuery("(max-width:855px)");
  const large = useMediaQuery("(min-width:1007px)");
  return (
    <div>
      <AppBar />

      <div className="px-4 h-full">
        <Hero small={small} large={large} />
        <HeroImage small={small} large={large} />
        <Features />
        <FinalCall />
        <Footer />
      </div>
    </div>
  );
};

export default Home;

const Hero = ({ small, large }) => {
  return (
    <div className="hero ">
      <div className="hero_text">
        <Typography variant={`${large ? "h2" : "h3"}`}>
          Keep track of your job applications
        </Typography>
        <p className=" text-gray-700">
          Tired of using spreadsheets to keep track of your job applications?
        </p>
        <Link to="/signup">
          <Button variant="contained" color="primary">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

const HeroImage = ({ small, large }) => {
  return (
    <div>
      {(small || large) && (
        <div className=" flex justify-center items-start">
          <img
            src={assets.images.app_light}
            className="app-light"
            alt="app preview"
            width="96%"
          />
        </div>
      )}
    </div>
  );
};

const FinalCall = () => {
  return (
    <div className="flex h-[500px] flex-col text-center p-12 justify-center items-center gap-4 ">
      <Typography variant="h3">Ready to get started?</Typography>
      <Typography variant="p" className="text-gray-700">
        Its simple, keep track of the important things with just a few clicks
      </Typography>
      <div className="flex justify-center items-center gap-4">
        <Link to="/signup">
          <Button variant="contained" color="primary">
            Get Started
          </Button>
        </Link>
        <Link to={"vincegabriel.flores@gmail.com"}>
          <Typography color="secondary" className="underline">
            Have any questions?
          </Typography>
        </Link>
      </div>
    </div>
  );
};
