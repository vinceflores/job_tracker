import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

import {columns} from "../../model/tables";

export default function BasicTable({ columns, rows }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">{columns[0].headerName}</TableCell>
            <TableCell align="left">{columns[1].headerName}</TableCell>
            <TableCell align="left">{columns[2].headerName}</TableCell>
            <TableCell align="left">{columns[3].headerName}</TableCell>
            <TableCell align="left">{columns[4].headerName}</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
            { rows.map((row) => (
                <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                <TableCell align="left">{row.company}</TableCell>
                <TableCell align="left">{row.job_title}</TableCell>
                <TableCell align="left">{row.status}</TableCell>
                <TableCell align="left">{row.date_applied}</TableCell>
                <TableCell align="left">{row.posting_link}</TableCell>
                </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
