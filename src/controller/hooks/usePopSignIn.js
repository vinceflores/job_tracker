import { useContext } from "react";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { AuthenticationContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { setDoc } from "firebase/firestore";

export const usePopSignIn = ({ provider }) => {
  const { authState, authDispatch } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const handleSign = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        // add to firestore
        if (user) {
          const userRef = doc(db, "users", user.uid);
          getDoc(userRef).then((docSnap) => {
            if (docSnap.exists()) {
              authDispatch({
                type: "LOGIN",
                payload: docSnap.data(),
              });
            } else {
              setDoc(doc(db, "users", user.uid), {
                id: user.uid,
                name: user.displayName,
                email: user.email,
              });
              authDispatch({
                type: "SIGNUP",
                payload: user,
              });
            }
          });
          navigate("/app");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return [handleSign];
};
