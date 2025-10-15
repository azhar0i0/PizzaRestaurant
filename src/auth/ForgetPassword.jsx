import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import dashboard from "./assets/login-rightside.png";
import logo from "./assets/restaurant-icon.png";
import "./Login.css";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }
    setMessage("✅ OTP sent to your email!");
    setTimeout(() => {
      navigate("/otpverification"); // ✅ Go to OTP page
    }, 2000);
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-logo">
          <img src={logo} alt="Logo" />
        </div>

        <h1 className="login-title">Forgot Password</h1>
        <p className="login-subtitle">
          Enter your registered email to receive a One-Time Password (OTP).
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label>Email Address</label>
            <div className="password-container">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="eye-icon">
                <FaEnvelope />
              </span>
            </div>
          </div>

          {message && (
            <div
              className={`login-message ${
                message.includes("✅") ? "success" : "error"
              }`}
            >
              {message}
            </div>
          )}

          <button type="submit" className="login-button">
            Send OTP
          </button>

          <p
            className="forgot-password"
            onClick={() => navigate("/")}
          >
            ← Back to Login
          </p>
        </form>
      </div>

      <div className="login-image">
        <img src={dashboard} alt="Dashboard" />
      </div>
    </div>
  );
}
