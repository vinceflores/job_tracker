import React, { useContext, useEffect } from "react";
import "../../pages/App.css";
import { FormControl, Button, Stack, TextField } from "@mui/material";
import { AuthenticationContext } from "../../controller/AuthContext";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../controller/firebase.js";
import { doc, getDoc, getDocs,  collection, query, limit,orderBy } from "firebase/firestore";
import {Box } from "@mui/system";
import {Link} from  "react-router-dom";
import { Typography } from "@mui/material";
import AuthWithGoogle from "./AuthWithGoogle";
import AuthWithGithub from "./AuthWithGithub";


const Login = () => {
  const { authState, authDispatch } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const handleTextChange = (e) => {
    authDispatch({
      type: "HANDLE_USER_INPUT_CHANGE",
      field: e.target.name,
      payload: e.target.value,
    });
  };
  const handleSignin = () => {
    signInWithEmailAndPassword(auth, authState.user.email, authState.user.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user) {
          const userRef = doc(db, "users", user.uid);
          getDoc(userRef).then((docSnap) => {
            if (docSnap.exists()) {
              authDispatch({
                type: "LOGIN",
                payload: docSnap.data(),
              });
            }
          });
          navigate("/app");
        }
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          alert("User does not exist");
        }
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(state.user.email, state.user.password)
    handleSignin();
  };

  return (
    <div className="form-container">
      <Box className="flex flex-col justify-center items-center border border-gray-900  p-4 rounded "> 
   
      <h1 className="form-h1">Login</h1>
      <FormControl>
        <Stack spacing={2}>
          <AuthWithGoogle />
          <AuthWithGithub /> 
          <Typography sx={{
            textAlign: "center"
          }} >or</Typography>
          <TextField
            value={authState.user.email}
            label="Email"
            type="text"
            name="email"
            variant="outlined"
            onChange={handleTextChange}
          />
          <TextField
            value={authState.user.password}
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            onChange={handleTextChange}
          />

        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
        <Typography variant="p" >
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>  
        </Typography>
        </Stack>
    
      </FormControl>
      </Box>
    </div>
  );
};

export default Login;
