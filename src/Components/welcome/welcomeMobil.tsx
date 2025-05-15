import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./welcomemobile.css";

const steps = [
  {
    label: "Academic Information",
    description:
      "This helps SIMBI recommend the right subjects, quiz difficulty, and study goals.",
    content: (
      <>
        <label className="welcome-label">
          What level of education are you currently in?
        </label>
        <select className="dropdown">
          <option className="first-option">Educational level</option>
          <option>Secondary</option>
          <option>Undergraduate</option>
          <option>Postgraduate</option>
        </select>
        <label className="welcome-label">
          Which of these subjects do you find most challenging?
        </label>
        <select className="dropdown">
          <option className="first-option">Select one or more</option>
          <option>Mathematics</option>
          <option>Science</option>
          <option>Literature</option>
        </select>
      </>
    ),
    progress: 15,
  },
  {
    label: "Learning Preferences",
    description:
      "We’ll tailor study sessions and reminders to fit your unique rhythm.",
    content: (
      <>
        <label className="welcome-label">How do you prefer to study?</label>
        <button className="option-btnn">Pomodoro style</button>
        <button className="option-btnn">Long deep work blocks</button>
        <button className="option-btnn">Random quick quizzes</button>
      </>
    ),
    progress: 45,
  },
  {
    label: "Personality & Motivation",
    description:
      "SIMBI wants to match your vibe and keep you motivated your way.",
    content: (
      <>
        <label className="welcome-label">What tone do you prefer to use?</label>
        <button className="option-btnn">Playful & Funny.</button>
        <button className="option-btnn">Calm & Supportive.</button>
        <button className="option-btnn">Straight to the point.</button>
      </>
    ),
    progress: 75,
  },
];

export default function WelcomeMobile() {
  const [stepIndex, setStepIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const sendDataToSimbiAI = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://simbi-ai.onrender.com/api/ai/ask-simbi",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send data to Simbi AI");
      }

      const data = await response.json();
      // Handle the response data as needed
      console.log("Simbi AI response:", data);

      // Store the AI response if needed
      localStorage.setItem("simbiAIResponse", JSON.stringify(data));

      navigate("/askSimbi");
    } catch (error) {
      console.error("Error sending data to Simbi AI:", error);
      navigate("/askSimbi"); // Still navigate even if API fails
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      sendDataToSimbiAI();
    }
  };

  const { label, description, content, progress } = steps[stepIndex];

  return (
    <div className="welcome-wrapper-mobile">
      <header className="welcome-header-mobile">
        <div>
          <img
            src="/assets/icons/Simbi-logo.svg"
            alt="Simbi Logo"
            // className="logo"
          />
        </div>

        <div className="user-info">
          <span className="bell-icon">
            <img
              src="/assets/icons/notification-icon.svg"
              alt="notification"
              className="bell-icon-img"
            />
          </span>

          <button className="wallet-btn-btn">Connect Wallet</button>
        </div>
      </header>
      <div className="welcome-title-content-mobile">
        <h2 className="welcome-title-mobile">
          Welcome to{" "}
          <img
            className="welcome-simbi-mobile"
            src="/assets/icons/Simbi-logo.png"
            alt="Simbi"
          />
        </h2>
        <p className="subtitle-mobile-mobile">Your AI Study Buddy</p>
        <p className="desc">
          Complete the the 3 steps to get a personalised study plan and content
        </p>
      </div>

      <div className="form-section-mobile">
        <div className="progress-bar-mobile">
          <div
            className="progresss-mobile"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="progress-percent-mobile">{progress}%</div>

        <h3 className="welcome-label-mobile">{label}</h3>
        <p className="desc">{description}</p>

        {content}

        <div className="div-next-butn-mobile">
          <button
            className="next-butn-mobile"
            onClick={nextStep}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
