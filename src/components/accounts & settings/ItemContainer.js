import React from "react";
import { Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
const ItemContainer = ({ style, title, divider, children }) => {
  const theme = useTheme();

  return (
    <>
      <Stack spacing={2} className=" flex flex-col justify-center items-center mx-auto p-4"  sx={{
        bgcolor: "background.default",
        margin: '1rem 0',
      }} style={style}>
        <Typography sx={{
          color: theme.palette.text.primary,
          textAlign: "left",
        }}  variant="h1" fontSize={24}>
          {title}
        </Typography>
        {children}
      </Stack>
      {
        divider ? <div className="w-full my-2 border-black border h-px  bg-black" />: ""
      }
    </>
  );
};

export default ItemContainer;
