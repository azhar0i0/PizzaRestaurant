// src/auth/NewPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import dashboard from "./assets/login-rightside.png";
import logo from "./assets/restaurant-icon.png";
import "./Login.css";

export default function NewPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("✘ Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirm) {
      setError("✘ Passwords do not match.");
      return;
    }

    setSuccess("✔ Password reset successful!");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="login-container">
      {/* Left Side */}
      <div className="login-form-container">
        <div className="login-logo">
          <img src={logo} alt="Logo" />
        </div>

        <h1 className="login-title">New Password</h1>
        <p className="login-subtitle">Enter your new password below.</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label>New Password</label>
            <div className="password-container">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="eye-icon" onClick={() => setShowPass(!showPass)}>
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="login-field">
            <label>Confirm Password</label>
            <div className="password-container">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {(error || success) && (
            <div className={`login-message ${error ? "error" : "success"}`}>
              {error || success}
            </div>
          )}

          <button type="submit" className="login-button">
            Save New Password
          </button>
        </form>

        <p className="demo-info">
          <b>Back to</b> <span onClick={() => navigate("/")} className="text-red-600 cursor-pointer">Login</span>
        </p>
      </div>

      {/* Right Side */}
      <div className="login-image">
        <img src={dashboard} alt="Dashboard" />
      </div>
    </div>
  );
}
