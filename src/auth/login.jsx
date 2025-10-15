import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import dashboard from "./assets/login-rightside.png";
import logo from "./assets/restaurant-icon.png";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    // ✅ Role-based login logic
    if (email === "admin@me" && password === "admin.me") {
      setSuccess("✔ Super Admin login successful!");
      setTimeout(() => navigate("/superadmin"), 800);
    } 
    else if (email === "admin@us" && password === "admin.me") {
      setSuccess("✔ Admin login successful!");
      setTimeout(() => navigate("/admin"), 800);
    } 
    else if (email === "user@me" && password === "user.me") {
      setSuccess("✔ User login successful!");
      setTimeout(() => navigate("/user"), 800);
    } 
    else {
      setError("✘ Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      {/* Left Side */}
      <div className="login-form-container">
        <div className="login-logo">
          <img src={logo} alt="Logo" />
        </div>

        <h1 className="login-title">Login</h1>
        <p className="login-subtitle">
          Welcome back! Please enter the following details.
        </p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="login-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label>Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="eye-icon" onClick={togglePassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {(error || success) && (
            <div className={`login-message ${error ? "error" : "success"}`}>
              {error || success}
            </div>
          )}

          <button type="submit" className="login-button">
            Login
          </button>

          <p
            className="forgot-password"
            onClick={() => navigate("/forgetpassword")}
          >
            Forgot Password?
          </p>
        </form>

        {/* Optional Demo Info */}
        <p className="demo-info align-center">
          Super Admin → <b>admin@me</b> / <b>admin.me</b> <br />
          Admin → <b>admin@us</b> / <b>admin.me</b> <br />
          User → <b>user@me</b> / <b>user.me</b>
        </p>
      </div>

      {/* Right Side */}
      <div className="login-image">
        <img src={dashboard} alt="Dashboard" />
      </div>
    </div>
  );
}
