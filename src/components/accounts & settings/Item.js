import React, { useContext, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { auth } from "../../controller/firebase";
import { db } from "../../controller/firebase";
import { AuthenticationContext } from "../../controller/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { useTheme } from "@emotion/react";
import Box from "@mui/material/Box";
export const Item = ({
  textLabel,
  variant,
  color,
  value,
  buttonLabel,
  type,
}) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({
    new: "",
    confirm: "",
  });
  const { authState, authDispatch } = useContext(AuthenticationContext);
  const theme = useTheme();
  const handleClick = () => {
    setOpen(!open);
  };
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    if (!validate()) {
      alert("Passwords do not match");
    }
    const docRf = doc(db, "users", authState.user.id);
    switch (type) {
      case "name":
        updateProfile(auth.currentUser, {
          displayName: input.new,
        })
          .then(() => {
            updateDoc(docRf, {
              name: input.new,
            });
            authDispatch({
              type: "UPDATE_Name",
              payload: input.new,
            });
            reset();
          })
          .catch((error) => {
            // An error occurred
            // ...
          });

        break;
      case "email":
        updateEmail(auth.currentUser, input.new)
          .then(() => {
            // Email updated!
            // ...
            updateDoc(docRf, {
              email: input.new,
            });

            authDispatch({
              type: "UPDATE_EMAIL",
              payload: input.new,
            });
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
        reset();
        break;
      case "password":
        updatePassword(auth.currentUser, input.new)
          .then(() => {
            // Password updated!
            // ...
          })
          .catch((error) => {
            // An error occurred
            // ...
          });

        break;
      default:
        break;
    }
  };
  const reset = () => {
    setInput({
      new: "",
      confirm: "",
    });
  };
  const validate = () => {
    return input.new === input.confirm;
  };

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        rowSpacing={1}
        columnSpacing={1}
        columns={{xs: 1, md:2}}
        marginLeft={5}
        className="w-full   lg:w-1/2  justify-between"
      >
        <Grid item className="flex-col  justify-start gap-4 items-center">
          <Typography
            sx={{
              color:
                color === "warning"
                  ? theme.palette.warning.main
                  : theme.palette.text.primary,
            }}

            className="text-xs md:text-lg"
          >
            {textLabel}
          </Typography>
          <Typography className="text-xs md:text-lg" >
            {value}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{
              color:
                theme.mode === "light" ? "#fff" : theme.palette.text.button,
            }}
            color={color}
            onClick={handleClick}
            variant={variant}
          >
            {buttonLabel}
          </Button>
        </Grid>
      </Grid>

      {/* edit */}
      {open ? (
        <Box className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex justify-start gap-4 items-center">
              <TextField
                variant="filled"
                color="warning"
                label={`new ${type}`}
                name={`new`}
                onChange={handleChange}
                value={input.new}
                type={type}
              />
            </div>
            <div className="flex justify-center gap-4 items-center">
              <TextField
                variant="filled"
                color="warning"
                name={`confirm`}
                onChange={handleChange}
                label={`confirm ${type}`}
                value={input.confirm}
                type={type}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                handleClick();
              }}
              variant="contained"
              color="warning"
              sx={{
                color: theme.palette.text.button,
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleSubmit();
                handleClick();
              }}
              variant="contained"
              color="secondary"
              sx={{
                color: theme.palette.text.button,
              }}
            >
              Submit
            </Button>
          </div>
        </Box>
      ) : (
        ""
      )}
    </>
  );
};
