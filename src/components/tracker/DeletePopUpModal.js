import React, { useState, useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal } from "@mui/material";
import { Button } from "@mui/material";
import { AuthenticationContext } from "../../controller/AuthContext";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../controller/firebase";
import { auth } from "../../controller/firebase";
import { style } from "./style";
import Badge from "@mui/material/Badge";
import { useTheme } from "@emotion/react";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import useToggleModal from "./hooks/useToggleModal";
import { useMediaQuery } from "@mui/material";

const DeletePopUpModal = () => {
  const { open,  handleOpen, handleClose, handleDelete } = useToggleModal();
  const { authState, authDispatch } = useContext(AuthenticationContext);

  // const handleDelete = () => {
  //   authDispatch({
  //     type: "Delete Applications",
  //   });
  //   authState.tableState.rows_selected.forEach((id) => {
  //     deleteDoc(doc(db, "users/" + auth.currentUser.uid + "/applications", id));
  //   });
  // };

  return (
    <div>
      <Badge
        badgeContent={authState.tableState.rows_selected_length}
        color="primary"
      >
        <Button
          onClick={handleOpen}
          variant="contained"
          disabled={authState.tableState.rows_selected_length === 0}
          aria-label="delete"
          color="error"
          startIcon={<DeleteIcon />}
        >
          <h1>Delete</h1>
        </Button>
      </Badge>

      <ConfirmDelete
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default DeletePopUpModal;

export const ConfirmDelete = ({
  open,
  handleClose,
  handleOpen,
  handleDelete,
}) => {
  const { authState, authDispatch } = useContext(AuthenticationContext);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style , width:  matches? "60%" : "90%"  , bgcolor: theme.palette.background.default }}>
        <Typography
          sx={{ color: theme.palette.text.primary }}
          id="modal-modal-title"
          variant="h5"
          component="h2"
        >
          Are you sure you want to delete{" "}
          {authState.tableState.rows_selected_length} items?
        </Typography>
        <Box>
          <div className="flex gap-1 items-baseline pl-0  bg-gray-300 rounded p-4 justify-start">
            <LightbulbIcon sx={{ color: theme.palette.secondary }} />
            <Typography sx={{ color: theme.palette.button }}>
              Note: This action cannot be undone. This will permanently delete
              the selected items.
            </Typography>
          </div>
        </Box>
        <div className="flex gap-2 my-3">
          <Button
            variant="contained"
            color="error"
            sx={{ color: theme.palette.text.button }}
            onClick={() => {
              authDispatch({
                type: "RESET_TABLE_STATE",
              });
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            color="secondary"
            variant="contained"
            sx={{ color: theme.palette.text.button }}
            onClick={() => {
              handleDelete();
              handleClose();
            }}
          >
            Delete
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
