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
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: "YOUR_GOOGLE_CLIENT_ID",
          callback: handleCredentialResponse,
          ux_mode: "redirect",
          login_uri: "simbi-app.vercel.app/welcome",
        });

        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInDiv")!,
          {
            theme: "outline",
            size: "large",
            logo_alignment: "center",
            text: "signup_with",
            shape: "rectangular",
          }
        );
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    const credential = url.searchParams.get("credential");
    if (credential) {
      handleCredentialResponse({ credential });
    }
  });

  const handleCredentialResponse = (response: { credential: string }) => {
    const userObject = decodeJwt(response.credential);
    console.log("Google User:", userObject);
    localStorage.setItem("simbiUser", JSON.stringify(userObject));
    navigate("/welcome");
  };

  const decodeJwt = (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Failed to decode JWT", error);
      return null;
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !educationLevel) {
      alert("Please fill in all required fields.");
      return;
    }

    const userData = {
      name,
      email,
      password,
      educationLevel,
      keepLoggedIn,
    };

    console.log("User Submitted:", userData);
    localStorage.setItem("simbiUser", JSON.stringify(userData));
    navigate("/login");
  };

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

          {/* Google Sign-In Button (Redirect Mode) */}
          <div id="googleSignInDiv" className="google-btn" />

          <div className="divider-line">
            <span className="line"></span>
            <span className="divider">or with email</span>
            <span className="line"></span>
          </div>

          <input
            type="text"
            placeholder="Full name"
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
              alt={showPassword ? "Hide password" : "Show password"}
              className="toggle-password-icon"
              onClick={togglePasswordVisibility}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && togglePasswordVisibility()}
              aria-label="Toggle password visibility"
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
