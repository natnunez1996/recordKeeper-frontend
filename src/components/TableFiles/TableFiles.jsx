import React, { Component } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import "./tableFiles.css";
import moment from "moment";

const Files = ({ date, formLists, handleUpdate }) => {
  const getTotalCharge = () => {
    let sum = 0;

    formLists.forEach((list) => (sum += +list.charge));

    return sum;
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: "1rem", mb: "1rem" }}>
        {formLists.length > 0 ? (
          <>
            <Typography variant="h4">
              Date:{" "}
              {date
                ? moment(date).format("MMMM D, YYYY")
                : moment(new Date()).format("MMMM D, YYYY")}
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Sr.
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Patient Name
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold" }}
                    width={40}
                    align="right"
                  >
                    Charge/s
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Agent Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Number of Rx
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Id Req'd
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Agent's Signature
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Time
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formLists &&
                  formLists.map((form) => (
                    <TableRow
                      key={form.sr}
                      onClick={() => handleUpdate(form.sr)}
                    >
                      <TableCell align="center">{form.sr}</TableCell>
                      <TableCell>{form.patientName}</TableCell>
                      <TableCell align="right">$ {form.charge}</TableCell>
                      <TableCell>{form.agentName}</TableCell>
                      <TableCell align="center">{form.numOfRx}</TableCell>
                      <TableCell align="center">{form.idRequired}</TableCell>
                      <TableCell>{form.agentName}</TableCell>
                      <TableCell align="center">{form.time}</TableCell>
                    </TableRow>
                  ))}
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Total Charge: $ {getTotalCharge()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </>
        ) : (
          <Typography
            variant="h5"
            align="center"
            sx={{ margin: "1rem", fontStyle: "italic" }}
          >
            <img
              src="/images/noRecord.svg"
              alt="No Record"
              width="200"
              height="200"
            />
            <br />
            No List Available. To Add a list, click the{" "}
            <strong>Add List</strong> Button.
          </Typography>
        )}
      </TableContainer>
    </>
  );
};

export default class TableFiles extends Component {
  render() {
    return (
      <Files
        handleUpdate={this.props.handleUpdate}
        formLists={this.props.formLists}
        date={this.props.date}
      />
    );
  }
}
