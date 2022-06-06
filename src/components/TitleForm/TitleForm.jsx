import { Button, Paper, TextField } from "@mui/material";
import React from "react";

const TitleForm = ({ handleTitleChange, handleSave, close }) => {
  return (
    <Paper
      elevation={12}
      sx={{
        padding: "1rem",
        margin: "5rem auto ",
        minWidth: "200px",
        width: "500px",
        display: "flex",
      }}
    >
      <TextField
        label="List's File Name"
        name="title"
        onChange={handleTitleChange}
      />
      <Button
        sx={{ ml: "1rem" }}
        variant="contained"
        color="success"
        onClick={handleSave}
      >
        Save File
      </Button>
      <Button
        sx={{ ml: "1rem" }}
        variant="contained"
        color="error"
        onClick={close}
      >
        Cancel
      </Button>
    </Paper>
  );
};

export default TitleForm;
