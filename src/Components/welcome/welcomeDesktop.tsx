import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./welcomeDesktop.css";
import HeadBar from "../headBar/headBar";


const desktopSteps = [
  {
    title: "Academic Information",
    description:
      "This helps SIMBI recommend the right subjects, quiz difficulty, and study goals.",
    image: "/assets/icons/book-icon.svg",
  },
  {
    title: "Learning Preferences",
    description:
      "We'll tailor study sessions and reminders to fit your unique rhythm.",
    image: "/assets/icons/fluent.svg",
  },
  {
    title: "Personality & Motivation",
    description:
      "SIMBI wants to match your vibe and keep you motivated, your way.",
    image: "/assets/icons/person-icon.svg",
  },
];

interface UserData {
  name: string;
  avatar?: string;
  educationLevel?: string;
  yearOfStudy?: string;
  studyPreference?: string;
  preferredTone?: string;
}

const WelcomeDesktop: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(15);
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("simbiUser");

    if (stored && stored !== "undefined") {
      try {
        const parsed = JSON.parse(stored);
        setUser({
          name: parsed.name || parsed.given_name || "User",
          avatar:
            parsed.avatar ||
            `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
              parsed.name || "User"
            )}`,
        });
      } catch (error) {
        console.error("Failed to parse simbiUser:", error);
        localStorage.removeItem("simbiUser");
      }
    } else {
      console.warn("simbiUser is not set or is invalid in localStorage.");
    }
  }, []);

  const updateUserData = (field: keyof UserData, value: string) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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
          body: JSON.stringify({ userData: user }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send data to Simbi AI");
      }

      const data = await response.json();
      localStorage.setItem("simbiAIResponse", JSON.stringify(data));
      navigate("/askSimbi");
    } catch (error) {
      console.error("Error sending data to Simbi AI:", error);
      navigate("/askSimbi");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep < desktopSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setProgress((progress) => progress + 30);
    } else {
      sendDataToSimbiAI();
    }
  };

    const skipWelcomes = () => {
      navigate("/askSimbi");
    
  };

  return (
    <div className="welcome-wrapper">
      <header className="welcome-header-Desktop">
        <img
          src="/assets/icons/Simbi-logo.png"
          alt="Simbi Logo"
          className="logo"
        />
        <div className="user-info">
          <HeadBar />
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
          <div className="welcome-sidebar">
            {desktopSteps.map((step, index) => (
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
                style={{ width: ` ${progress}%` }}
              ></div>
            </div>
            <p className="progress-percent">{progress}%</p>

            <div className="form-content">
              {currentStep === 0 && (
                <>
                  <label className="welcome-label">
                    What level of education are you currently in?
                  </label>
                  <select
                    className="select"
                    value={user?.educationLevel || ""}
                    onChange={(e) =>
                      updateUserData("educationLevel", e.target.value)
                    }
                  >
                    <option value="" className="first-option">
                      Educational level
                    </option>
                    <option value="High School">High School</option>
                    <option value="University">University</option>
                  </select>

                  <label className="welcome-label">
                    What year of study are you in?
                  </label>
                  <select
                    className="select"
                    value={user?.yearOfStudy || ""}
                    onChange={(e) =>
                      updateUserData("yearOfStudy", e.target.value)
                    }
                  >
                    <option value="" className="first-option">
                      Select-option
                    </option>
                    <option value="Js 1-3">Junior Secondary</option>
                    <option value="Ss 1-3">Senior Secondary</option>
                    <option value="100 level">100 level</option>
                    <option value="200 level">200 level</option>
                    <option value="300 level">300 level</option>
                    <option value="400 level">400 level</option>
                    <option value="500 level">500 level</option>
                    <option value="600 level">600 level</option>
                  </select>
                </>
              )}

              {currentStep === 1 && (
                <>
                  <label className="welcome-label">
                    How do you prefer to study?
                  </label>
                  <button
                    className={`option-btnn ${
                      user?.studyPreference === "Pomodoro style"
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      updateUserData("studyPreference", "Pomodoro style")
                    }
                  >
                    Pomodoro style
                  </button>
                  <button
                    className={`option-btnn ${
                      user?.studyPreference === "Long deep work blocks"
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      updateUserData("studyPreference", "Long deep work blocks")
                    }
                  >
                    Long deep work blocks
                  </button>
                  <button
                    className={`option-btnn ${
                      user?.studyPreference === "Random quick quizzes"
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      updateUserData("studyPreference", "Random quick quizzes")
                    }
                  >
                    Random quick quizzes
                  </button>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <label className="welcome-label">
                    Which tone do you prefer SIMBI to use?
                  </label>
                  <button
                    className={`option-btnn ${
                      user?.preferredTone === "Playful and funny"
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      updateUserData("preferredTone", "Playful and funny")
                    }
                  >
                    Playful and funny
                  </button>
                  <button
                    className={`option-btnn ${
                      user?.preferredTone === "Calm and supportive"
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      updateUserData("preferredTone", "Calm and supportive")
                    }
                  >
                    Calm and supportive
                  </button>
                  <button
                    className={`option-btnn ${
                      user?.preferredTone === "Straight to the point"
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      updateUserData("preferredTone", "Straight to the point")
                    }
                  >
                    Straight to the point
                  </button>
                </>
              )}

              <div className="div-next-butn">
                {currentStep < desktopSteps.length - 1 && (
                  <div className="skipcontainer-desktop">
                    <button className="skip-welcome" onClick={skipWelcomes}>
                      Skip
                    </button>
                    <IoIosArrowForward />
                  </div>
                )}

                <button
                  className="next-butn"
                  onClick={handleNext}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WelcomeDesktop;