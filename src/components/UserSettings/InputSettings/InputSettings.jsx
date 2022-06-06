import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Alert,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_MESSAGE } from "../../../constants";

const InputSettings = ({
  handleCancel,
  handleChange,
  handleSave,
  handleShowPassword,
  handleShowVerifyPassword,
  label,
  name,
  type,
  typeVerifyPassword,
}) => {
  const dispatch = useDispatch();

  const { messageUpdate } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      dispatch({ type: CLEAR_MESSAGE });
    };
  }, []);

  const handleAlert = () => {
    if (messageUpdate === "Update Successful") {
      return <Alert severity="success">{messageUpdate}</Alert>;
    } else {
      return <Alert severity="error">{messageUpdate}</Alert>;
    }
  };

  return (
    <Container>
      <Paper sx={{ m: "5rem auto", width: "500px", padding: "2rem" }}>
        <Typography variant="h6">Confirm Changes </Typography>
        <Grid container spacing={2} sx={{ mt: ".25rem", mb: "1rem" }}>
          <Grid item xs={12}>
            <TextField
              name={name}
              label={label}
              fullWidth
              onChange={(e) => handleChange(e.target)}
              type={type}
              InputProps={
                name === "password"
                  ? {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleShowPassword}>
                            {type === "password" ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }
                  : null
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: ".5rem" }}>
          <Grid item xs={12}>
            <TextField
              name="verifyPassword"
              label="Type your Password to Save Changes"
              required
              fullWidth
              onChange={(e) => handleChange(e.target)}
              type={typeVerifyPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowVerifyPassword}>
                      {typeVerifyPassword === "password" ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: ".5rem" }}>
          <Grid item xs={12}>
            {messageUpdate && handleAlert()}
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              color="error"
              onClick={handleCancel}
            >
              Exit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default InputSettings;
