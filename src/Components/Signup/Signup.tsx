// src/pages/Signup.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

import invisibleIcon from "/assets/icons/visibility-off.svg";
import visibleIcon from "/assets/icons/eye.svg";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id:
          "6846893560-imp57m3r6aft7c9lpu4c7sor3tuf1oid.apps.googleusercontent.com",
        callback: handleCredentialResponse,
        ux_mode: "redirect",
        login_uri: "https://simbi-app.vercel.app/welcome",
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv")!,
        { theme: "outline", size: "large", text: "signup_with" }
      );
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCredentialResponse = (response: { credential: string }) => {
    const userObject = decodeJwt(response.credential);
    localStorage.setItem("simbiUser", JSON.stringify(userObject));
    navigate("/login");
  };

  const decodeJwt = (token: string) => {
    try {
      const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (err) {
      console.error("JWT decode error", err);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !educationLevel) {
      alert("Please fill in all required fields.");
      return;
    }

    const userData = { name, email, password, educationLevel };

    try {
      const response = await fetch(
        "https://simbi-ai.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const result = await response.json();

      // Optionally store token or user data
      localStorage.setItem("simbiUser", JSON.stringify(result));

      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup. Please try again.");
    }
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!name || !email || !password || !educationLevel) {
  //     alert("Please fill in all required fields.");
  //     return;
  //   }

  //   const userData = { name, email, password, educationLevel, keepLoggedIn };
  //   localStorage.setItem("simbiUser", JSON.stringify(userData));
  //   navigate("/login");
  // };

  return (
    <div className="signup-wrapper">
      <header className="signup-header">
        <img
          src="/assets/icons/Simbi-logo.png"
          alt="Simbi Logo"
          className="logo"
        />
      </header>
      <div className="signup-content">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign up to get access to unlimited learning</h2>
          <div id="googleSignInDiv" className="google-btn" />
          <div className="divider-line">
            <span className="line"></span>
            <span className="divider">or with email</span>
            <span className="line"></span>
          </div>
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <img
              src={showPassword ? visibleIcon : invisibleIcon}
              className="toggle-password-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <select
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
            required
          >
            <option value="">Educational level</option>
            <option value="secondary">Secondary School</option>
            <option value="university">University</option>
          </select>
          <label className="remember-me">
            <input
              type="checkbox"
              checked={keepLoggedIn}
              onChange={(e) => setKeepLoggedIn(e.target.checked)}
            />
            Keep me logged in
          </label>
          <button type="submit" className="signup-button">
            Sign up
          </button>
          <p className="redirect-login">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Log in</span>
          </p>
        </form>
        <img
          src="/assets/character-design.png"
          alt="Simbi Character"
          className="signup-illustration"
        />
      </div>
    </div>
  );
};

export default Signup;
