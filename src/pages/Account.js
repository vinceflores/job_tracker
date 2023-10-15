import React, { useEffect } from "react";
import { useContext } from "react";
import { AuthenticationContext } from "../controller/AuthContext";
import { auth } from "../controller/firebase";
import Navbar from "../components/navigation/Navbar";
import { Typography, Stack } from "@mui/material";
import { Item } from "../components/accounts & settings/Item";
import { ControlledSwitches } from "../components/accounts & settings/ControlledSwitches";
import ItemContainer from "../components/accounts & settings/ItemContainer";
import { Box } from "@mui/system";
import { useTheme } from "@emotion/react";

import AppBar from "../components/navigation/Appbar";

const Account = () => {
  const { authState, authDispatch, colorMode } = useContext(
    AuthenticationContext
  );
  const theme = useTheme();
  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.secondary,
        height: "100vh",
      }}
    >

      <AppBar />
      <Box
        sx={{
          bgcolor: theme.palette.background.default,
        }}
        className=" md:mx-auto p-8"
      >
        {/* Account */}
        <ItemContainer title="Account">
          {auth.currentUser ? (
            <>
              <Item
                textLabel="Name:"
                value={auth.currentUser.displayName}
                buttonLabel="Change Name"
                variant={"contained"}
                color={"secondary"}
                type={"name"}
              />
              <Item
                textLabel="Email:"
                value={auth.currentUser.email}
                buttonLabel="Change Email"
                variant={"contained"}
                type={"email"}
                color={"secondary"}
              />
              <Item
                textLabel="Password:"
                value="********"
                buttonLabel="Change Password"
                variant={"contained"}
                color={"secondary"}
                type={"password"}
              />
            </>
          ) : (
            ""
          )}
        </ItemContainer>

        {/* Appearance */}

        <ItemContainer title="Appearance">
          <div className="flex w-full justify-between items-center gap-2">
            <Typography
              sx={{
                color: theme.palette.text.primary,
              }}
              variant="h3"
              fontSize={22}
            >
              Dark Mode
            </Typography>
            <ControlledSwitches />
          </div>
        </ItemContainer>

        {/* Danger Zone */}
        <ItemContainer
          style={{
            marginRight: "auto",
            marginLeft: "auto",
          }}
          title="Danger Zone"
          divider={false}
        >
          <Item
            textLabel="Delete Account:"
            value=""
            variant={"contained"}
            color="warning"
            buttonLabel="Delete Account"
          />
        </ItemContainer>
      </Box>
    </Box>
  );
};

export default Account;
