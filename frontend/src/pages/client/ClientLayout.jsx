import React from "react";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
const ClientLayout = () => {
  return (
    <>
      <Navbar />
      <div style={{marginTop : "70px"}}>
        <Outlet />
      </div>
    </>
  );
};

export default ClientLayout;
