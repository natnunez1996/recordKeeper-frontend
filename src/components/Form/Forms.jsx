import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
  Button,
  Paper,
  Autocomplete,
} from "@mui/material";

const Forms = ({
  onChange,
  onChangeOptions,
  clear,
  customersOptions,
  handleSubmit,
  formData,
}) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const agentName = user?.result.name;

  return (
    <Paper
      elevation={12}
      sx={{ padding: "1rem", margin: "3rem", minWidth: "200px" }}
    >
      {formData.sr > 0 ? (
        <h2>Edit Sr. {formData.sr}:</h2>
      ) : (
        <h2>Submit New Entry:</h2>
      )}
      <FormControl fullWidth sx={{ mb: "1rem" }}>
        <Autocomplete
          freeSolo
          options={customersOptions}
          getOptionLabel={(option) => option?.patientName}
          inputValue={formData.patientName}
          onChange={onChangeOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{ ...params.InputProps, type: "search" }}
              label="Patient's Name"
              name="patientName"
              onChange={(e) => onChange(e.target)}
              value={formData.patientName}
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth sx={{ mb: "1rem" }}>
        <InputLabel htmlFor="chargeInput">Charge/s</InputLabel>
        <OutlinedInput
          id="chargeInput"
          label="Charge/s"
          name="charge"
          type="number"
          value={formData.charge}
          onChange={(e) => onChange(e.target)}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>
      <FormControl fullWidth sx={{ mb: "1rem" }}>
        <TextField
          label="Agent's Name"
          name="agentName"
          onChange={(e) => onChange(e.target)}
          value={formData.agentName ? formData.agentName : agentName}
        />
      </FormControl>
      <FormControl fullWidth sx={{ mb: "1rem" }}>
        <TextField
          label="Number of Rx"
          name="numOfRx"
          type="number"
          value={formData.numOfRx}
          onChange={(e) => onChange(e.target)}
        />
      </FormControl>
      <FormControl fullWidth sx={{ mb: "1rem" }}>
        <TextField
          select
          label="ID Required?"
          name="idRequired"
          onChange={(e) => onChange(e.target)}
          value={formData.idRequired}
        >
          <MenuItem key="Yes" value="Yes">
            Yes
          </MenuItem>
          <MenuItem key="No" value="No">
            No
          </MenuItem>
        </TextField>
      </FormControl>
      <FormControl sx={{ display: "block", mb: "1rem" }}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <TextField
            id="time"
            label="Time"
            type="time"
            name="time"
            value={formData.time}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // every 5 min
            }}
            sx={{ width: 162 }}
            onChange={(e) => onChange(e.target)}
          />
        </LocalizationProvider>
      </FormControl>
      <Button
        variant="contained"
        name={formData.sr > 0 ? "Update" : "Submit"}
        type="submit"
        onClick={handleSubmit}
        sx={{ m: "1rem 1rem 1rem 0" }}
      >
        {formData.sr > 0 ? "Update" : "Submit"}
      </Button>
      <Button variant="contained" color="error" onClick={clear}>
        Cancel
      </Button>
    </Paper>
  );
};

export default Forms;
