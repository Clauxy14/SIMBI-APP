import React from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/verify-code"); // go to verification page after signup
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-left">
          <img src="/assets/panda-image.svg" alt="Panda" />
        </div>
        <div className="signup-right">
          <h2>Sign up</h2>
          <form onSubmit={handleSignup}>
            <label>Name</label>
            <input type="text" placeholder="Enter Name" required />

            <label>Email</label>
            <input type="email" placeholder="Enter Email" required />

            <label>Password</label>
            <input type="password" placeholder="Enter Password" required />

            <button type="submit">Sign up</button>
          </form>
          <p className="already">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Sign in</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
