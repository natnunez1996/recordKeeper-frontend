import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Typography } from "@mui/material";
import Label from "./Label/Label";
import { updateAuth, updatePassword } from "../../actions/authActions";
import { useDispatch } from "react-redux";

const UserSettings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);

  const userDefault = {
    firstName: user.result.name.split(" ")[0],
    lastName: user.result.name.split(" ")[1],
    username: user.result.username,
    password: "●●●●●●●●●●",
  };

  const [updateSettings, setUpdateSettings] = useState({
    id: user.result._id,
    firstName: user.result.name.split(" ")[0],
    lastName: user.result.name.split(" ")[1],
    username: user.result.username,
    password: "●●●●●●●●●●",
  });

  const clearVerifyPassword = () => {
    setUpdateSettings({ ...updateSettings, verifyPassword: "" });
  };

  const handleChange = ({ name, value }) => {
    setUpdateSettings({ ...updateSettings, [name]: value });
  };
  const handleSave = () => {
    dispatch(updateAuth(updateSettings, navigate));
    clearVerifyPassword();
  };

  const handleSavePassword = () => {
    dispatch(updatePassword(updateSettings, navigate));
    clearVerifyPassword();
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleShowVerifyPassword = () => {
    setShowVerifyPassword((prevState) => !prevState);
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ m: "1rem", padding: "1rem" }}>
        <Typography variant="h5" sx={{ mb: "1rem" }}>
          User Settings
        </Typography>
        <Label
          label="First Name"
          name="firstName"
          value={userDefault.firstName}
          handleShowVerifyPassword={handleShowVerifyPassword}
          typeVerifyPassword={showVerifyPassword ? "text" : "password"}
          handleChange={handleChange}
          handleSave={handleSave}
        />
        <Label
          label="Last Name"
          name="lastName"
          value={userDefault.lastName}
          handleShowVerifyPassword={handleShowVerifyPassword}
          typeVerifyPassword={showVerifyPassword ? "text" : "password"}
          handleChange={handleChange}
          handleSave={handleSave}
        />
        <Label
          label="Username"
          name="username"
          value={userDefault.username}
          handleShowVerifyPassword={handleShowVerifyPassword}
          typeVerifyPassword={showVerifyPassword ? "text" : "password"}
          handleChange={handleChange}
          handleSave={handleSave}
        />
        <Label
          label="Password"
          name="password"
          value={userDefault.password}
          handleShowPassword={handleShowPassword}
          handleShowVerifyPassword={handleShowVerifyPassword}
          type={showPassword ? "text" : "password"}
          typeVerifyPassword={showVerifyPassword ? "text" : "password"}
          handleChange={handleChange}
          handleSave={handleSavePassword}
        />
      </Paper>
    </Container>
  );
};

export default UserSettings;
