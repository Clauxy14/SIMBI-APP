import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./welcome.css";

const steps = [
  {
    title: "Academic Information",
    description:
      "This helps SIMBI recommend the right subjects, quiz difficulty, and study goals.",
    image: "/assets/icons/book-icon.svg",
  },
  {
    title: "Learning Preferences",
    description:
      "We’ll tailor study sessions and reminders to fit your unique rhythm.",
    image: "/assets/icons/fluent.svg",
  },
  {
    title: "Personality & Motivation",
    description:
      "SIMBI wants to match your vibe and keep you motivated, your way.",
    image: "/assets/icons/person-icon.svg",
  },
];

const Welcome: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(15);
  const [user, setUser] = useState<{ name: string; avatar?: string } | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("simbiUser");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser({
        name: parsed.name || parsed.given_name || "User",
        avatar:
          parsed.avatar ||
          "https://api.dicebear.com/7.x/bottts/svg?seed=${encodedName}",
      });
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setProgress((progress) => progress + 30);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="welcome-wrapper">
      <header className="welcome-header">
        <img
          src="/assets/icons/Simbi-logo.png"
          alt="Simbi Logo"
          className="logo"
        />
        <div className="user-info">
          <span className="bell-icon">
            <img src="/assets/icons/notification-icon.svg" alt="notification" />
          </span>
          <div className="user-avatar">
            <img src={user?.avatar} alt="Avatar" />
            <span className="username">{user?.name}</span>
          </div>
          <button className="wallet-btn">Connect Wallet</button>
        </div>
      </header>

      <main className="welcome-title-content">
        <h1 className="welcome-title">
          Welcome to{" "}
          <span className="welcome-simbi">
            <img src="/assets/icons/Simbi-logo.svg" alt="simbi" />
          </span>
        </h1>
        <p className="subtitle">Your AI Study Buddy</p>
        <p className="desc">
          Complete the 3 steps to get a personalised study plan and content
        </p>

        <div className="welcome-container">
          <div className="sidebar">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`step ${index === currentStep ? "active" : ""}`}
              >
                <div className="image-icon">
                  <img src={step.image} alt="image-icon" />
                </div>
                <div className="label">
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="form-section">
            <div className="progress-bar">
              <div
                className="progresss"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="progress-percent">{progress}%</p>

            <div className="form-content">
              {currentStep === 0 && (
                <>
                  <label className="welcome-label">
                    What level of education are you currently in?
                  </label>
                  <select>
                    <option>Educational level</option>
                    <option>High School</option>
                    <option>University</option>
                  </select>

                  <label className="welcome-label">
                    Which subjects do you find most challenging?
                  </label>
                  <select>
                    <option>Select one or more</option>
                    <option>Math</option>
                    <option>Science</option>
                  </select>
                </>
              )}

              {currentStep === 1 && (
                <>
                  <label className="welcome-label">
                    How do you prefer to study?
                  </label>
                  <button className="option-btn">Pomodoro style</button>
                  <button className="option-btn">Long deep work blocks</button>
                  <button className="option-btn">Random quick quizzes</button>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <label className="welcome-label">
                    Which tone do you prefer SIMBI to use?
                  </label>
                  <button className="option-btn">Playful and funny</button>
                  <button className="option-btn">Calm and supportive</button>
                  <button className="option-btn">Straight to the point</button>
                </>
              )}

              <button className="next-butn" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Welcome;
