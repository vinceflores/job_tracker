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
import { Card, CardContent, CardMedia, } from "@mui/material";
import { Grid } from "@mui/material";
import Footer from "../components/landing/Footer";
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
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

const Features = () => {
  const small = useMediaQuery("(max-width:855px)");
  const medium = useMediaQuery("(min-width:856px) and (max-width:1279px)");
  const large = useMediaQuery("(min-width:1280px)");

  const features = [
    {
      title: "Track Applications",
      description: "Keep track of all your job applications in one place",
      image: assets.images.track_applications,
      icon: <StackedLineChartIcon /> 
    },
    {
      title: "Set Reminders",
      description: "Never miss an important deadline or interview again",
      image: assets.images.set_reminders,
    },
    {
      title: "Easy to Use",
      description: "Simple and easy to use interface",
      image: assets.images.organize_contacts,
    },
  ];

  return (
    <div className="features">
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height={small ? "200" : medium ? "250" : "300"}
                image={feature.image}
                alt={feature.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const FinalCall = () => {
  return (
    <div className="flex  flex-col text-center p-12 justify-start items-center gap-4 ">
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

