import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { setSocketToken, socket } from "../../lib/socket.js";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNotification from "../../components/admin/AdminNotification.jsx";

const AdminLayout = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    if (!accessToken) return;
    setSocketToken(accessToken);
    socket.connect();

    socket.on("notification", (notification) => {
      console.log("Notification:", notification);

      setNotifications((prev) => [
        ...prev,
        {
          id: Date.now(),
          title: "New Review",
          message: notification.message,
        },
      ]);
    });
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    return () => {
      socket.off("connect");
      socket.disconnect();
    };
  }, [accessToken]);
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
      <AdminNotification notifications={notifications} />
    </>
  );
};

export default AdminLayout;
