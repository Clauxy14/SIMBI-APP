import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Onboarding.css";

const onboardingData = [
  {
    image: "/assets/panda-image.svg",
    title: "Meet Simbi!",
    description:
      "Not your boring study tool. I am the AI buddy who will keep you awake.",
  },
  {
    image: "/assets/book-laptop.svg",
    title: "Cut the Bluff!",
    description:
      "I break down complex stuff into the language you will understand. Academic jargon is allowed here.",
  },
  {
    image: "/assets/tough-love.svg",
    title: "Tough Love",
    description:
      "Procrastination again? I will call you out. See me as your friend who will never let you slack.",
  },
  {
    image: "/assets/brain-image.svg",
    title: "Brain Hacks",
    description:
      "I learn how your brain works and adapt. The more we study, the smarter we both get.",
  },
];

const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingData.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        <div className="image-container">
          <img src={onboardingData[currentStep].image} alt="Onboarding" />
        </div>

        <h2 className="title">{onboardingData[currentStep].title}</h2>
        <div className="description-wrap">
          <p className="description">
            {onboardingData[currentStep].description}
          </p>
        </div>

        <div className="progress">
          {onboardingData.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentStep ? "active" : ""}`}
            ></span>
          ))}
        </div>
        <div className="buttons">
          {currentStep > 0 && (
            <button className="back" onClick={handleBack}>
              Back
            </button>
          )}
          {currentStep < onboardingData.length - 1 ? (
            <button className="next" onClick={handleNext}>
              Next
            </button>
          ) : (
            <button className="next" onClick={() => navigate("/Signup")}>
              Let's Create It
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
