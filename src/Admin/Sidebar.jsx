// Sidebar.jsx
import React from "react";
import {
  FaThLarge,
  FaPizzaSlice,
  FaUtensils,
  FaUserAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import logo from "./assets/restaurant-icon.png";
import "./Admin.css";

export default function Sidebar({ active = "dashboard", onSelect = () => {} }) {
  // active can be "dashboard" | "menu" | "orders" | "users"
  const items = [
    { key: "dashboard", icon: <FaThLarge />, title: "Dashboard" },
    { key: "menu", icon: <FaPizzaSlice />, title: "Menu" },
    { key: "orders", icon: <FaUtensils />, title: "Orders" },
    { key: "users", icon: <FaUserAlt />, title: "Users" },
  ];

  return (
    <aside className="sidebar image-like-sidebar">
      <div className="sidebar-top">
        <div className="logo-circle">
          <img src={logo} alt="logo" />
        </div>

        <div className="menu-icon-list">
          {items.map((it) => (
            <button
              key={it.key}
              className={`sidebar-icon-btn ${active === it.key ? "active" : ""}`}
              onClick={() => onSelect(it.key)}
              title={it.title}
            >
              <span className="inner-icon">{it.icon}</span>
            </button>
          ))}
        </div>
      </div>

      <button className="logout-btn sidebar-logout" title="Logout">
        <FaSignOutAlt />
      </button>
    </aside>
  );
}
