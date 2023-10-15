import { createContext, useEffect, useMemo, useState, useReducer } from "react";
import { auth, db } from "./firebase";
import { signOut } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { Timestamp, setDoc, doc } from "firebase/firestore";
import { initialStae } from "../model/IntialState";
import { blueGrey, deepOrange, grey, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import green from "@mui/material/colors/green";
import purple from "@mui/material/colors/purple";
import blue from "@mui/material/colors/blue";
import { indigo, A100 } from "@mui/material/colors";
import useMode from "./hooks/useMode";


export const AuthenticationContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "Delete Applications":
      return {
        ...state,
        applications: state.applications.filter(
          (application) =>
            !state.tableState.rows_selected.includes(application.id)
        ),
        tableState: {
          ...state.tableState,
          rows_selected_length: 0,
          rows_selected: [],
        },
      };
    case "RESET_TABLE_STATE":
      return {
        ...state,
        tableState: {
          ...state.tableState,
          rows_selected_length: 0,
          rows_selected: [],
        },
      };
    case "SELECTED_APPLICATIONS":
      return {
        ...state,
        tableState: {
          ...state.tableState,
          rows_selected_length: action.payload.length,
          rows_selected: action.payload,
        },
      };
    case "HANDLE_MODAL_INPUT_CHANGE":
      return {
        ...state,
        tempApplication: {
          ...state.tempApplication,
          [action.field]: action.payload,
        },
      };
    case "HANDLE_MODAL_CLOSE":
      return {
        ...state,
        tempApplication: {
          company: "",
          job_title: "",
          location: "",
          posting_link: "",
          date_applied: new Date(),
          notes: "",
          status: "",
        },
      };
    case "HANDLE_MODAL_SUBMIT":
      const user = auth.currentUser;
      let s = "users/" + user.uid + "/applications";

      function generateToken(n) {
        var chars =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var token = "";
        for (var i = 0; i < n; i++) {
          token += chars[Math.floor(Math.random() * chars.length)];
        }
        return token;
      }
      let id = generateToken(10);
      const userRef = doc(db, s, id);
      setDoc(userRef, {
        ...state.tempApplication,
        date_applied: Timestamp.fromDate(state.tempApplication.date_applied),
        id: id,
      });

      return {
        ...state,
        applications: [
          ...state.applications,
          {
            ...state.tempApplication,
            date_applied: Timestamp.fromDate(
              state.tempApplication.date_applied
            ),
            id: id,
          },
        ],
        tempApplication: {
          id: "",
          company: "",
          job_title: "",
          location: "",
          posting_link: "",
          date_applied: new Date(),
          notes: "",
          status: "",
        },
      };

    case "HANDLE_USER_INPUT_CHANGE":
      return {
        ...state,
        user: {
          ...state.user,
          [action.field]: action.payload,
        },
      };
    case "LOGIN":
      return {
        ...state,
        user: {
          ...state.user,
          id: action.payload.id,
          email: action.payload.email,
          name: action.payload.name,
        },
      };
    case "GET_APPLICATIONS":
      return {
        ...state,
        applications: action.payload,
      };
    case "GET_PROFILE":
      return {
        ...state,
        user: {
          ...state.user,
          id: action.payload.id,
          email: action.payload.email,
          name: action.payload.name,
        },
      };
    case "LOGOUT":
      signOut(auth)
        .then(() => {
          // Sign-out successful.

        })
        .catch((error) => {});

      return {
        ...state,
        user: {
          ...state.user,
          id: "",
          email: "",
          name: "",
        },
        applications: [],
      };
    case "SIGNUP":
      return {
        ...state,
        user: {
          ...state.user,
          id: action.payload.uid,
          email: action.payload.email,
        },
      };
    case "UPDATE_EMAIL":
      return {
        ...state,
        user: {
          ...state.user,
          email: action.payload,
        },
      };

    case "UPDATE_Name":
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload,
        },
      };
    default:
      return state;
  }
}

function AuthContext({ children }) {
  const [authState, authDispatch] = useReducer(reducer, initialStae);
  const navigate = useNavigate();
  const location = useLocation();

  // const [mode, setMode] = useState("light");

  // useEffect(() => {
  //   console.log( window.matchMedia("(prefers-color-scheme: dark)").matches);
  //   if (location.pathname === "/") {
  //     setMode("light");
  //   }
  // }, [location.pathname]);
  const [mode, colorMode] = useMode();

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        authDispatch({
          type: "GET_PROFILE",
          payload: {
            id: user.uid,
            email: user.email,
            name: user.displayName,
          },
        });
      }
    });
  }, [auth.currentUser, location.pathname]);

  return (
    <AuthenticationContext.Provider
      value={{ authState, authDispatch, colorMode }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AuthenticationContext.Provider>
  );
}

export default AuthContext;

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: grey[900],
          },
          secondary: {
            main: blueGrey[600],
          },
          warning: {
            main: red[700],
          },
          error: {
            main: red[700],
          },
          background: {
            default: "#fff",
            nav: "#fff",
            paper: "#F5F5F5",
          },
          text: {
            primary: grey[900],
            secondary: blueGrey[700],
            button: "#fff",
            nav_buton: "#000"
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: blueGrey[100],
          },
          secondary: {
            main: blueGrey[800],
          },
          background: {
            default: grey[900],
            nav: grey[900],
            paper: grey[800],
          },
          warning: {
            // main: "#E7EBC5"
            main: red[500],
          },
          text: {
            primary: "#fff",
            nav: grey[800],
            secondary: blueGrey[200],
            // button: grey[900],
            button: "#fff",
            nav_button: "#fff" 
          },
        }),
  },
});
