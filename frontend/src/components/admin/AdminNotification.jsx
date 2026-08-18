import React from "react";
import "./AdminNotification.css";

const AdminNotification = ({ notifications }) => {
  return (
    <div className="admin-notification-container">
      {notifications.map((notification) => (
        <div className="admin-notification" key={notification.id}>
          <div className="notification-content">
            <h4>{notification.title}</h4>
            <p>{notification.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminNotification;
