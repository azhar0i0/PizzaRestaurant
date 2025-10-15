import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./auth/Login";
import ForgetPassword from "./auth/ForgetPassword";
import OTPverification from "./auth/OTPverification";
import NewPassword from "./auth/NewPassword";
import SuperAdmin from "./SuperAdmin/SuperAdmin";
import Admin from "./Admin/Admin";
import User from "./User/User";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/otpverification" element={<OTPverification />} />
        <Route path="/newpassword" element={<NewPassword />} />
        <Route path="/superadmin" element={<SuperAdmin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
