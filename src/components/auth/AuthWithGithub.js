import React from "react";
import { Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { githubProvider } from "../../controller/firebase";
import { usePopSignIn } from "../../controller/hooks/usePopSignIn";

const AuthWithGithub = () => {
  const [handleSign] = usePopSignIn({ provider: githubProvider });
  return (
    <Button
      onClick={handleSign}
      sx={{
        ":hover": {
          bgcolor: "primary.main",
          color: "white",
        },
      }}
      variant="outlined"
      startIcon={<GitHubIcon />}
    >
      Sign in with Github
    </Button>
  );
};

export default AuthWithGithub;
