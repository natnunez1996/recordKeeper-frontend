import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "../components/Auth/Auth";
import ExportToPdf from "../components/ExportToPdf";
import Home from "../components/Home/Home";
import UserSettings from "../components/UserSettings/UserSettings";

const Router = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Routes>
      <Route
        path="/"
        exact
        element={
          <Navigate to={user ? `/${user.result._id}/myrecords` : "/auth"} />
        }
      />
      <Route path="/:id/myrecords" exact element={<Home />} />
      <Route path="/export" exact element={<ExportToPdf />} />
      <Route path="/export/:id" exact element={<ExportToPdf />} />
      <Route path="/user" exact element={<UserSettings />} />
      <Route
        path="/auth"
        exact
        element={!user ? <Auth /> : <Navigate to="/myrecords" replace />}
      />
    </Routes>
  );
};

export default Router;
