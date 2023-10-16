import React from "react";
import { Typography } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import { Grid } from "@mui/material";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import CheckIcon from "@mui/icons-material/Check";

export const Features = () => {
  const features = [
    {
      title: "Track Applications",
      description: "Keep track of all your job applications in one place",
      icon: <StackedLineChartIcon fontSize="large" />,
    },
    {
      title: "Easy to Use",
      description: "Simple and easy to use interface",

      icon: <CheckIcon fontSize="large" />,
    },
  ];

  return (
    <div className="features h-[300px] my-4">
      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        spacing={4}
      >
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="flex flex-col justify-center items-center">
              {feature.icon}
              <CardContent className="flex flex-col justify-center items-center">
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
