import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Onboarding.css";

const slides = [
  {
    title: "Meet Simbi!",
    description:
      "Not your boring study tool. I am the AI buddy who will keep you awake.",
    image: "/assets/meet-simbi.svg",
    imageStyle: { width: "21%" },
  },
  {
    title: "Cut the Bluff!",
    description:
      "I break down complex stuff into the language you will understand. Academic jargon is allowed here.",
    image: "/assets/Cut-bluff.svg",
    imageStyle: { width: "38%" },
  },
  {
    title: "Tough Love",
    description:
      "Procrastination again? I will call you out. See me as your friend who will never let you slack.",
    image: "/assets/tough-love.png",
    imageStyle: { width: "40%" },
  },
  {
    title: "Brain Hacks",
    description:
      "I learn how your brain works and adapt. The more we study, the smarter we both get.",
    image: "/assets/brain.png",
    imageStyle: { width: "31%" },
  },
];

const Onboarding: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      navigate("/landingpage");
    }
  };

  const skipOnboarding = () => {
    navigate("/landingpage");
  };

  return (
    <div className="onboarding-wrapper">
      <header className="onboarding-header">
        <img
          src="/assets/icons/Simbi-logo.png"
          alt="Simbi Logo"
          className="logo"
        />
      </header>
      <div className="onboarding-container">
        <div className="slide-container">
          <div className="slide">
            <img
              src={slides[currentIndex].image}
              alt="slide visual"
              className="slide-image"
              style={slides[currentIndex].imageStyle}
            />
            <div className="slide-text">
              <h1>{slides[currentIndex].title}</h1>
              <p>{slides[currentIndex].description}</p>
              <div className="progress">
                {slides.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${
                      index === currentIndex ? "active" : "dot"
                    }`}
                  ></span>
                ))}
              </div>
              <div className="button-group">
                <button className="onboarding-next" onClick={nextSlide}>
                  Next
                </button>

                {currentIndex < slides.length - 1 && (
                  <button className="skip" onClick={skipOnboarding}>
                    Skip
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
