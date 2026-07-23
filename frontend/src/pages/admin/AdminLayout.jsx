import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <>
      <AdminSidebar />
      <main
        style={{
          marginLeft: "250px",
          minHeight: "100vh",
          background: "#0b0b0b",
        }}
      >
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
