import { Button } from "@mui/material";
import React, { useContext } from "react";
import { googleProvider } from "../../controller/firebase";
import { AuthenticationContext } from "../../controller/AuthContext";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import { usePopSignIn } from "../../controller/hooks/usePopSignIn";

const AuthWithGoogle = () => {
  const { authState, authDispatch } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const [handleSign] = usePopSignIn({ provider: googleProvider });
  const handleClick = () => {
    handleSign();
  };

  return (
    <Button
      startIcon={<GoogleIcon />}
      onClick={handleClick}
      variant="outlined"
      sx={{
        ":hover": {
          bgcolor: "warning.main",
          color: "white",
        },
      }}
    >
      Sign with Google
    </Button>
  );
};

export default AuthWithGoogle;
