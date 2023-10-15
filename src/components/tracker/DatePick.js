import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useContext } from "react";
import { AuthenticationContext } from "../../controller/AuthContext";
import dayjs from "dayjs";

export default function DatePick({ children }) {
  const { authState, authDispatch } = useContext(AuthenticationContext);
  const handleChange = (val) => {

    authDispatch({
      type: "HANDLE_MODAL_INPUT_CHANGE",
      field: "date_applied",
      payload: new Date(val.format()),
    });
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker onChange={handleChange} value={dayjs(authState.tempApplication.date_applied)} />
    </LocalizationProvider>
  );
}
