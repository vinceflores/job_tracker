import React from "react";
import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import SelfImprovementRoundedIcon from "@mui/icons-material/SelfImprovementRounded";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faMedium } from "@fortawesome/free-brands-svg-icons";
import CoffeeIcon from '@mui/icons-material/Coffee';
const socials = [
  {
    name: "LinkedIn",
    to: "https://www.linkedin.com/in/vince-flores-software-engineer/",
    icon: <LinkedInIcon />,
  },
  {
    name: "Twitter",
    to: "https://twitter.com/vinceflores_",
    icon: <TwitterIcon />,
  },
  {
    name: "github",
    to: "https://githuhttps://github.com/vincefloresb.com",
    icon: <GitHubIcon />,
  },
  {
    name: "Medium",
    to: "https://medium.com/@vincegabriel.flores",
    icon: <FontAwesomeIcon icon={faMedium} size="lg" />,
  },
  {
    name: "personal website",
    to: "https://vinceflores.ca/",
    icon: <SelfImprovementRoundedIcon />,
  },
];

const Footer = () => {
  return (
    <>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="#app-bar-with-responsive-menu"
        sx={{
          mr: 2,
          display: { md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
        className="text-center w-full"
      >
        JobTracker
      </Typography>

      <Box className="w-full h-[50vh  ] item-start gap-4 justify-start flex  flex-col-reverse md:flex-row  p-4 py-5 ">
        {/* Socials */}
        <div className="flex  flex-col justify-start">
          <div className="flex  flex-col justify-start">
            <div className="flex  rounded">
              {/* socials */}
              {socials.map((social) => (
                <SocialIcon
                  key={social.name}
                  to={social.to}
                  icon={social.icon}
                />
              ))}
            </div>
          </div>

          {/* Some text of encouragement  */}
          <div className="flex flex-col gap-2   justify-start  items-start">
            <Link
              to={"https://www.buymeacoffee.com/vinceflroes"}
              className="w-full"
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<CoffeeIcon />}
                className="max-sm:w-full"
              >
                Buy me a coffee
              </Button>
            </Link>
          </div>
        </div>

        {/* Some text of encouragement  */}
        <div className="flex flex-col gap-2  justify-start  items-start ">
          <Typography
            sx={{
              color: grey[600],
            }}
            variant="p"
            className="text-left  "
          >
            I wanted to make a Job applicatoin tracking app for student slike me
            who just need a little help keeping track of all the applications
            they send out. I hope you find this app useful and if you have any
            questions or comments please feel free to reach out to me on any of
            my socials.
          </Typography>
          <p className="text-[10px] text-gray-600">Copyrights vinceflores</p>
        </div>
      </Box>
    </>
  );
};

export default Footer;

const SocialIcon = ({ to, icon }) => {
  return (
    <Link to={to} className="rounded ">
      <Button>{icon}</Button>
    </Link>
  );
};
