import React from "react";
import { Outlet } from "react-router-dom";
// import NavBar from "../NavBar/NavBar";
import "./MainLayout.css";

const MainLayout: React.FC = () => {
  return (
    <div className="app-container">

      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
