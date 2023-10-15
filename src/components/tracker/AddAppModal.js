import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { AuthenticationContext } from "../../controller/AuthContext";
import { status } from "../../model/status";
import { style } from "./style";
import DatePick from "./DatePick";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(status[0]);
  const [inputValue, setInputValue] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    authDispatch({
      type: "HANDLE_MODAL_CLOSE",
    });
  };
  const { authState, authDispatch } = useContext(AuthenticationContext);
  const handleTextChange = (e) => {
    authDispatch({
      type: "HANDLE_MODAL_INPUT_CHANGE",
      field: e.target.name,
      payload: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    authDispatch({
      type: "HANDLE_MODAL_SUBMIT",
    });
  };
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div>
      <Button
        sx={{
          color: theme.palette.text.button,
        }}
        color="secondary"
        variant="contained"
        onClick={handleOpen}
      >
        <div className="flex justify-start items-start gap-1">
          <AddIcon />
          <h1>New</h1>
        </div>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          ...style , 
          width: matches ? "50%" : "95%", 
          bgcolor: theme.palette.background.default,
        } }>
          <Typography id="modal-modal-title" sx={{color: theme.palette.text.primary  }} variant="h6" component="h2">
            Add a new application
          </Typography>
          <Grid container spacing={1} columns={{lg: 3,  md: 2, sm: 1}}>
            <Grid item  md={1} >
              <TextField
                name="company"
                label="Compny"
                value={authState.tempApplication.company}
                onChange={handleTextChange}
                helperText="name of the company"
              />
            </Grid>
            <Grid item  md={1}> 
              <TextField
                name="job_title"
                label="Position"
                size="small"
                value={authState.tempApplication.job_title}
                onChange={handleTextChange}
                helperText="job title"
              />
            </Grid>
            <Grid item md={1}>
              <TextField
                name="location"
                label="Location"
                value={authState.tempApplication.location}
                onChange={handleTextChange}
                helperText="address"
              />
            </Grid>
            <Grid item md={1} >
              <TextField
                name="posting_link"
                label="Link"
                value={authState.tempApplication.posting_link}
                onChange={handleTextChange}
                helperText="Job posting link"
              />
            </Grid>
            <Grid item  md={1}>
              <DatePick />
            </Grid>
            <Grid item>
              <TextField
                name="notes"
                label="Notes"
                value={authState.tempApplication.notes}
                onChange={handleTextChange}
              />
            </Grid>
            <Grid item >
              <Autocomplete
                value={authState.tempApplication.status}
                size="small"
                onChange={(event, newValue) => {
                  authDispatch({
                    type: "HANDLE_MODAL_INPUT_CHANGE",
                    field: "status",
                    payload: newValue,
                  });
                }}
                name="status"
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={status}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Status" />
                )}
              />
            </Grid>
          </Grid> 

          {/* Buttons */}
          <div className="flex gap-2 my-3">
            <Button
              id="cancel"
              variant="contained"
              color="error"
              onClick={handleClose}
              sx={{
                color: theme.palette.text.button,
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                handleSubmit(e);
                handleClose();
              }}
              id="submit"
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
      </Modal>
    </div>
  );
}
