import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import Router from "./router/Router";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
