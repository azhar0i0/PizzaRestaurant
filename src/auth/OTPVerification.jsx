// src/auth/OTPVerification.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dashboard from "./assets/login-rightside.png";
import logo from "./assets/restaurant-icon.png";
import "./Login.css";

export default function OTPVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (otp === "1234") {
      setSuccess("✔ OTP Verified Successfully!");
      setTimeout(() => {
        navigate("/newpassword");
      }, 800);
    } else {
      setError("✘ Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="login-container">
      {/* Left Side */}
      <div className="login-form-container">
        <div className="login-logo">
          <img src={logo} alt="Logo" />
        </div>

        <h1 className="login-title">OTP Verification</h1>
        <p className="login-subtitle">Enter the 4-digit OTP sent to your email.</p>

        <form onSubmit={handleVerify} className="login-form">
          <div className="login-field">
            <label>OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={4}
              required
            />
          </div>

          {(error || success) && (
            <div className={`login-message ${error ? "error" : "success"}`}>
              {error || success}
            </div>
          )}

          <button type="submit" className="login-button">
            Verify OTP
          </button>
        </form>

        <p className="demo-info">
          Didn’t receive the OTP? <b>Resend</b>
        </p>
      </div>

      {/* Right Side */}
      <div className="login-image">
        <img src={dashboard} alt="Dashboard" />
      </div>
    </div>
  );
}
