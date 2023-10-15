import React, { useEffect } from "react";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@emotion/react";
import { CheckBox, LinkOffOutlined } from "@mui/icons-material";
import { Link } from "@mui/material";
import { useContext } from "react";
import { AuthenticationContext } from "../../controller/AuthContext";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useToggleModal from "./hooks/useToggleModal";
import { ConfirmDelete } from "./DeletePopUpModal";

const MobileAcordian = ({ children, column }) => {
  const { authState, authDispatch } = useContext(AuthenticationContext);
  useEffect(() => {
    console.log("authState", authState.applications);
  }, [authState.applications]);

  return (
    <div>
      {authState.applications?.map((row) => {
        return <Summary key={row.id} row={row} />;
      })}
    </div>
  );
};

export default MobileAcordian;

const Summary = ({ row }) => {
  const theme = useTheme();
  const [checked, setChecked] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const { open, handleOpen, handleClose, handleDelete } = useToggleModal();
  const { authState, authDispatch } = useContext(AuthenticationContext);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleExpand = (event, isExpanded) => {
    setExpanded(isExpanded ? row.id : false);
  };
  const Del = () => {
    authDispatch({
      type: "SELECTED_APPLICATIONS",
      payload: new Array(row.id),
    });
    handleOpen();
    setExpanded(false);
  };
  const Cancel = () => {
    authDispatch({
      type: "RESET_TABLE_STATE",
    });
    setExpanded(false);
  };

  return (
    <Accordion disableGutters onChange={handleExpand} expanded={expanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        sx={{
          bgcolor: theme.palette.background.paper,
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
        }}
        id="panel1a-header"
        className="flex text-left flex-col "
      >
        <Typography>{row.job_title}</Typography>
      </AccordionSummary>
      <AccordionDetails className="flex w-full text-left flex-col gap-4">
        <h2>
          Company: <i>{row.company}</i>{" "}
        </h2>
        <h3>
          Status: <i>{row.status}</i>{" "}
        </h3>
        {/* <h4>{row.date_applied}</h4> */}
        <h5>
          Location: <i>{row.location}</i>
        </h5>
        <h6>
          Posting Link:{" "}
          <Link href={row.posting_link}>
            {" "}
            go to <OpenInNewIcon />{" "}
          </Link>
        </h6>
        <p>{row.notes}</p>

        <Button
          onClick={Del}
          color="warning"
          variant="contained"
          startIcon={<DeleteIcon />}
        >
          Remove?
        </Button>
        <Button onClick={Cancel} variant="contained">
          Cancel
        </Button>
      </AccordionDetails>
      <ConfirmDelete
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </Accordion>
  );
};
