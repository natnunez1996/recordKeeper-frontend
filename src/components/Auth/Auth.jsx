import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Input from "./Input/Input";
import "./auth.css";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signUp } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";
import { CLEAR_MESSAGE } from "./../../constants/index";

const formInitialState = {
  username: "",

  firstName: "",
  lastName: "",

  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [authData, setAuthData] = useState(formInitialState);

  useEffect(() => {
    return () => {
      dispatch({ type: CLEAR_MESSAGE });
    };
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(signIn(authData, navigate));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(signUp(authData, navigate));
  };

  const handleChange = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="xs">
      <Paper className="paper" elevation={6}>
        <Typography variant="h3" align="center">
          {isSignUp ? "Register" : "Sign In"}
        </Typography>
        <form className="form">
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  half
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                />
                <Input
                  half
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                />
              </>
            )}
            <Input
              autoFocus
              name="username"
              handleChange={handleChange}
              label="Username"
            />
            <Input
              name="password"
              onChange={(e) => e.target.value}
              label="Password"
              type={showPassword ? "text" : "password"}
              handleChange={handleChange}
              handleLogIn={handleSignIn}
              handleShowPassword={() =>
                setShowPassword((prevShowPassword) => !prevShowPassword)
              }
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                onChange={(e) => e.target.value}
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                handleChange={handleChange}
                handleShowPassword={() =>
                  setShowConfirmPassword((prevState) => !prevState)
                }
              />
            )}
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              {message && <Alert severity="error">{message}</Alert>}
            </Grid>
          </Grid>
        </form>

        {!isSignUp ? (
          <>
            <Button
              className="button__auth"
              sx={{ mb: "10px" }}
              variant="contained"
              color="primary"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
            <Button
              className="button__auth"
              variant="contained"
              color="success"
              onClick={() => setIsSignUp((prevState) => !prevState)}
            >
              Sign Up
            </Button>
          </>
        ) : (
          <>
            <Button
              className="button__auth"
              sx={{ mb: "10px" }}
              variant="contained"
              color="primary"
              onClick={handleSignUp}
            >
              Register
            </Button>
            <Button
              variant="transparent"
              color="primary"
              onClick={() => setIsSignUp((prevState) => !prevState)}
            >
              Already have an account? SIGN IN
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Auth;
