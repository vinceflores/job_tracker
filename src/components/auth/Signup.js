import React, { useContext, useState } from "react";
import "../../pages/App.css";
import { FormControl, Button, Stack, TextField } from "@mui/material";
import { AuthenticationContext } from "../../controller/AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../controller/firebase.js";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AuthWithGoogle from "./AuthWithGoogle";
import AuthWithGithub from "./AuthWithGithub";
import EmailIcon from "@mui/icons-material/Email";

const Signup = () => {
  const { authState, authDispatch } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleSignup = (p) => {
    createUserWithEmailAndPassword(auth, authState.user.email, p)
      .then((userCredential) => {
        // Signed in
        updateProfile(auth.currentUser, {
          displayName: authState.user.name,
        });

        const user = userCredential.user;
        setDoc(doc(db, "users", user.uid), {
          id: user.uid,
          name: authState.user.name,
          email: authState.user.email,
        });
        authDispatch({
          type: "SIGNUP",
          payload: user,
        });
        navigate("/app");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          // alert("The email address is already in use");
        } else if (error.code === "auth/invalid-email") {
          alert("The email address is not valid.");
        } else if (error.code === "auth/operation-not-allowed") {
          alert("Operation not allowed.");
        } else if (error.code === "auth/weak-password") {
          alert("The password is too weak.");
        }
      });
  };
  const handleTextChange = (e) => {
    authDispatch({
      type: "HANDLE_USER_INPUT_CHANGE",
      field: e.target.name,
      payload: e.target.value,
    });
  };
  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSubmit = () => {
    if (password.password === password.confirmPassword) {
      handleSignup(password.password);
      navigate("/login");
    }
  };

  return (
    <div className="form-container outline">
      <Box className="flex flex-col justify-center items-center border border-gray-900  p-4 rounded ">
        <h1 className="form-h1">Signup</h1>
        <FormControl>
          <Stack spacing={2}>
            <AuthWithGoogle />
            <AuthWithGithub />
            <Typography sx={{ textAlign: "center" }}>or</Typography>

            <Button
              onClick={handleClick}
              startIcon={<EmailIcon />}
              variant="outlined"
            >
              {" "}
              Email & Password{" "}
            </Button>
            {open && (
              <>
                <TextField
                  label="Name"
                  value={authState.user.name}
                  name="name"
                  onChange={handleTextChange}
                  type="text"
                  variant="outlined"
                />
                <TextField
                  label="Email"
                  value={authState.user.email}
                  name="email"
                  type="text"
                  onChange={handleTextChange}
                  variant="outlined"
                />
                <TextField
                  label="Password"
                  value={password.password}
                  name="password"
                  type="password"
                  onChange={handlePasswordChange}
                  variant="outlined"
                />
                <TextField
                  label="Confirm Password"
                  type="password"
                  value={password.confirmPassword}
                  name="confirmPassword"
                  onChange={handlePasswordChange}
                  variant="outlined"
                />
                <Button onClick={handleSubmit} variant="contained">
                  Submit
                </Button>
              </>
            )}
            <Typography variant="p">
              Already have an account?{" "}
              <Link to="/login" className="  text-blue-500 hover:underline  ">
                Log in{" "}
              </Link>
            </Typography>
          </Stack>
        </FormControl>
      </Box>
    </div>
  );
};

export default Signup;
