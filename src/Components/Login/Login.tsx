import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import invisibleIcon from "/assets/icons/visibility-off.svg";
import visibleIcon from "/assets/icons/eye.svg";

type GoogleInitOptions = {
  client_id: string;
  callback: (response: { credential: string }) => void;
  ux_mode?: "popup" | "redirect";
  login_uri?: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [accountError, setAccountError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google && window.google.accounts) {
        const options: GoogleInitOptions = {
          client_id: "YOUR_GOOGLE_CLIENT_ID",
          callback: handleCredentialResponse,
          ux_mode: "redirect",
          login_uri: window.location.origin + "/login",
        };

        window.google.accounts.id.initialize(options);

        window.google.accounts.id.renderButton(
          document.getElementById("google-signin-button")!,
          {
            theme: "outline",
            size: "large",
            text: "signin_with",
            logo_alignment: "center",
          }
        );

        window.google.accounts.id.prompt();
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  });

  const handleCredentialResponse = (response: { credential: string }) => {
    const userObject = decodeJwt(response.credential);
    const storedUser = localStorage.getItem("simbiUser");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.email === userObject.email) {
        localStorage.setItem("simbiUser", JSON.stringify(userObject));
        navigate("*");
      } else {
        setAccountError(true);
      }
    } else {
      alert("Account not found. Please sign up.");
    }
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storedUser = localStorage.getItem("simbiUser");

    if (!storedUser) {
      setAccountError(true);
      return;
    }

    const user = JSON.parse(storedUser);
    if (user.email === email && user.password === password) {
      navigate("/welcome");
    } else {
      setAccountError(true);
    }
  };

  return (
    <div className="login-wrapper">
      <header className="login-header">
        <img
          src="/assets/icons/Simbi-logo.png"
          alt="Simbi Logo"
          className="logo"
        />
      </header>

      <div className="login-content">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Sign in to Simbi</h2>

          {/* Google Sign-In Button */}
          <div id="google-signin-button"></div>

          <div className="divider-line">
            <span className="line"></span>
            <span className="divider">or with email</span>
            <span className="line"></span>
          </div>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-input-wrappers">
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

          <label className="remember-me">
            <input
              type="checkbox"
              checked={keepLoggedIn}
              onChange={(e) => setKeepLoggedIn(e.target.checked)}
            />
            Keep me logged in
          </label>

          <button type="submit" className="login-button">
            Continue
          </button>

          {accountError && (
            <div className="account-alert">
              Account not found, please sign up first.
            </div>
          )}

          <button
            className="wallet-connect"
            onClick={() => navigate("/connect-wallet")}
          >
            Sign In With Wallet
          </button>

          <p className="redirect-signup">
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")}>Sign up</span>
          </p>
        </form>

        <img
          src="/assets/Simbi-hello.svg"
          alt="Simbi Character"
          className="login-illustration"
        />
      </div>
    </div>
  );
};

export default Login;
