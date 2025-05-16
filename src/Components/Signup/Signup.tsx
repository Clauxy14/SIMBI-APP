import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./Signup.css";

import invisibleIcon from "/assets/icons/visibility-off.svg";
import visibleIcon from "/assets/icons/eye.svg";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [levelOfEducation, setLevelOfEducation] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleGoogleSuccess = (credentialResponse: any) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("No credential received");
      }

      const userObject = jwtDecode(credentialResponse.credential);
      localStorage.setItem("simbiUser", JSON.stringify(userObject));
      navigate("/welcome");
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError("Failed to sign in with Google. Please try again.");
    }
  };

  const handleGoogleFailure = () => {
    setError("Google sign-in was unsuccessful. Please try again.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Basic validation
    if (!name || !email || !password || !levelOfEducation) {
      setError("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    // Password validation
    if (password.length < 8) {
      setError("Password must be at least  characters long.");
      setIsSubmitting(false);
      return;
    }

    const userData = {
      name,
      email,
      password,
      levelOfEducation,
    };

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

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Signup failed");
      }

      navigate("/login", {
        state: {
          registrationSuccess: true,
          registeredEmail: email,
        },
      });
    } catch (error) {
      console.error("Signup error:", error);
      let errorMessage = "An error occurred during signup. Please try again.";

      if (error instanceof Error) {
        if (error.message.includes("email already exists")) {
          errorMessage = "This email is already registered. Please log in.";
        } else if (error.message.includes("username taken")) {
          errorMessage = "Username already taken. Please choose another.";
        } else {
          errorMessage = error.message;
        }
      }

      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
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

          <div className="google-signin-container">
            <GoogleOAuthProvider clientId="6846893560-imp57m3r6aft7c9lpu4c7sor3tuf1oid.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
                useOneTap
                text="signup_with"
                shape="pill"
                width="450"
                logo_alignment="center"
              />
            </GoogleOAuthProvider>
          </div>

          {error && <div className="error-message">{error}</div>}

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
              className="sign-password-input-wrapper"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
            <img
              src={showPassword ? visibleIcon : invisibleIcon}
              className="toggle-password-icon"
              onClick={() => setShowPassword(!showPassword)}
              alt="Toggle password visibility"
            />
          </div>
          <select
            value={levelOfEducation}
            onChange={(e) => setLevelOfEducation(e.target.value)}
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
          <button
            type="submit"
            className="signup-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Sign up"}
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
