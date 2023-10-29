import React, { useState, useContext, useEffect } from "react";
import { AuthenticationContext } from "../../controller/AuthContext";
import { auth, db } from "../../controller/firebase";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, useMediaQuery } from "@mui/material";
import BasicModal from "./AddAppModal";
import DeletePopUpModal from "./DeletePopUpModal";
import { columns } from "../../model/tables";
import "./tracker.css";
import { useTheme } from "@emotion/react";
import { Box } from "@mui/system";
import MobileAcordian from "./MovileAcordian";

const Tracker = () => {
  const { authState, authDispatch } = useContext(AuthenticationContext);
  const matches = useMediaQuery("(max-width:1160px)");
  const theme = useTheme();
  
  useEffect(() => {
    if (auth.currentUser) {
      const user = auth.currentUser;
      let s = "users/" + user.uid + "/applications";
      const userRef = collection(db, s);
      const q = query(userRef, orderBy("status"), limit(5));
      getDocs(q).then((querySnapshot) => {
        // paginate here
        const applications = [];
        querySnapshot.forEach((doc) => {
          applications.push(doc.data());
        });
        authDispatch({
          type: "GET_APPLICATIONS",
          payload: applications,
        });
      });
    }
  }, [auth.currentUser]);

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
      }}
      className="p-4 w-full flex flex-col "
    >
      {/* Action tabs / buttons   */}
      <Box
        sx={{
          bgcolor: theme.palette.background.default,
        }}
        className="flex flex-row-reverse p-3"
      >
        <Box
          sx={{
            bgcolor: theme.palette.background.default,
          }}
          className="flex gap-3 justfy-center items-center"
        >
          <Typography
            sx={{
              color: theme.palette.text.primary,
            }}
          >
            {authState.applications.length} Applications
          </Typography>
          <DeletePopUpModal />
          <BasicModal />
        </Box>
      </Box>
      {/* Tables */}
      <Box
        sx={{
          bgcolor: theme.palette.background.default,
        }}
        className="mx-auto  flex-grow"
      >
        {matches ? (
          <>
            <MobileAcordian column={columns} />
          </>
        ) : (
          <DataGrid
            columns={columns}
            rows={authState.applications}
            pageSize={5}
            rowsPerPageOptions={[5]}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            sx={{
              bgcolor: "background.default",
              color: theme.palette.text.primary,
            }}
            onRowSelectionModelChange={(e) => {
              authDispatch({
                type: "SELECTED_APPLICATIONS",
                payload: e,
              });
            }}
            rowSelectionModel={authState.tableState.rows_selected}
            setRowSelectionModel={authState.tableState.rows_selected_length > 0}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        )}
      </Box>
    </Box>
  );
};

export default Tracker;
