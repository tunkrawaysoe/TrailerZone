import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { socket } from "../../lib/socket.js";
import { useEffect } from "react";
const AdminLayout = () => {
  useEffect(() => {
    socket.connect();
    
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    return () => {
      socket.off("connect");
      socket.disconnect();
    };
  }, []);
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
