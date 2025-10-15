import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import logo from "../SuperAdmin/assets/restaurant-icon.png";
import "./User.css";

export default function User() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="user-container">
      <aside className="user-sidebar">
        <div className="sidebar-top">
          <div className="logo-circle">
            <img src={logo} alt="logo" />
          </div>
          <h2 className="sidebar-title">User</h2>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      <main className="user-main">
        <header className="user-header">
          <h1>Welcome, User</h1>
          <div className="user-right">
            <FaUserAlt />
            <p>Profile</p>
          </div>
        </header>

        <div className="user-dashboard">
          <h2>Dashboard</h2>
          <p>View your restaurant updates and account details here.</p>
        </div>
      </main>
    </div>
  );
}
