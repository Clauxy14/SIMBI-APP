import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      <header className="landing-header">
        <img
          src="/assets/icons/Simbi-logo.png"
          alt="Simbi Logo"
          className="logo"
        />
        <div className="language-switch">
          <span className="language-text">SITE LANGUAGE</span>
          <span className="language-option">
            ENGLISH{" "}
            <img
              src="/assets/icons/Flag-US.png"
              alt="US Flag"
              className="flag"
            />
          </span>
        </div>
      </header>

      <div className="landing-content">
        <img
          src="/assets/Simbi-hello.svg"
          alt="Simbi Character"
          className="landing-illustration"
        />

        <div className="landing-text">
          <h1>
            Everything is learnable and <br /> fun with Simbi, come along!
          </h1>
          <button onClick={() => navigate("/signup")} className="get-started">
            Get started
          </button>
          <button onClick={() => navigate("/login")} className="login-redirect">
            Already have an account? Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
