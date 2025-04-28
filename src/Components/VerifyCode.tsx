import React from "react";
import { useNavigate } from "react-router-dom";
import "./VerifyCode.css";

const VerifyCode: React.FC = () => {
  const navigate = useNavigate();

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/login"); // after verification, go to login
  };

  return (
    <div className="verify-container">
      <div className="verify-card">
        <h2>Enter the verification code sent to your email</h2>
        <form onSubmit={handleContinue}>
          <input type="text" placeholder="Enter Code" required />
          <button type="submit" className="send-code">
            Send Code
          </button>
          <button type="submit" className="continue-btn">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyCode;
