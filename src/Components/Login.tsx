import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Logged in!"); // replace this with your auth logic
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          <img src="/assets/panda-image.svg" alt="Panda" />
        </div>
        <div className="login-right">
          <h2>Log in</h2>
          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input type="email" placeholder="Enter Email" required />

            <label>Password</label>
            <input type="password" placeholder="Enter Password" required />

            <div className="options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
            </div>

            <button type="submit">Log In</button>
          </form>

          <p className="no-account">
            Don't have an account?{" "}
            <span onClick={() => navigate("/Signup")}>Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
