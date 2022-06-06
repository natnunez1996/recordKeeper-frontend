import { Grid, IconButton, InputAdornment } from "@mui/material";
import React from "react";
import { TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Input = ({
  half,
  name,
  handleChange,
  label,
  autoFocus,
  type,
  handleShowPassword,
  handleLogIn,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        onKeyDown={
          name === "password"
            ? (e) => {
                if (e.key === "Enter") handleLogIn(e);
              }
            : null
        }
        InputProps={
          name === "password" || name === "confirmPassword"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
