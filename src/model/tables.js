import React from "react";
import { Button, a } from "@mui/material";
import LaunchIcon from '@mui/icons-material/Launch';
export const columns = [
  {
    field: "company",
    headerName: "Company",
    width: 130,
    editable: false,
  },
  {
    field: "job_title",
    headerName: "Position",
    width: 400,
    editable: false,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    editable: false,
  },
  {
    field: "date_applied",
    headerName: "Date",
    type: "date",
    width: 130,
    editable: false,
    valueGetter: (params) => {
      return params.value.toDate();
    },
  },
  {
    field: "posting_link",
    headerName: "Posting Link",
    width: 300,
    editable: false,
    renderCell: (params) => {
      return (
        <a
          href={`${params.value}`}
          rel="noreferrer"
          target="_blank"
        >
            <LaunchIcon /> 
        </a>
      );
    },
  },
];
