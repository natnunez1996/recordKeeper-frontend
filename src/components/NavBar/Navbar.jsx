import { AppBar, Box, Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import { logOut } from "../../actions/authActions";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logOut(navigate));
    window.location.reload();
  };

  const login = () => {
    navigate("/auth", { replace: true });
  };

  const userSettings = () => {
    navigate("/user", { replace: true });
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      className="nav__appBar"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Button>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            to={`/${user?.result._id}/myrecords`}
          >
            My Records
          </NavLink>
        </Button>
        {user && (
          <Button>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="/export/"
            >
              Create Record
            </NavLink>
          </Button>
        )}
      </div>
      <div>
        {user ? (
          <Box sx={{ display: "flex", verticalAlign: "middle" }}>
            <Button
              color="primary"
              onClick={userSettings}
              sx={{ mr: "1rem", fontSize: "1.2rem" }}
            >
              {user.result.name}
            </Button>
            <Button color="error" variant="contained" onClick={logout}>
              Log Out
            </Button>
          </Box>
        ) : (
          <Button color="primary" variant="contained" onClick={login}>
            Sign In
          </Button>
        )}
      </div>
    </AppBar>
  );
};

export default Navbar;
