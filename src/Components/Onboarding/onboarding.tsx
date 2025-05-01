import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Onboarding.css";

const slides = [
  {
    title: "Meet Simbi!",
    description:
      "Not your boring study tool. I am the AI buddy who will keep you awake.",
    image: "/assets/meet-simbi.svg",
    imageStyle: { maxWidth: "23%" },
  },
  {
    title: "Cut the Bluff!",
    description:
      "I break down complex stuff into the language you will understand. Academic jargon is allowed here.",
    image: "/assets/Cut-bluff.svg",
    imageStyle: { maxWidth: "47%" },
  },
  {
    title: "Tough Love",
    description:
      "Procrastination again? I will call you out. See me as your friend who will never let you slack.",
    image: "/assets/Tough-love.svg",
    imageStyle: { maxWidth: "47%" },
  },
  {
    title: "Brain Hacks",
    description:
      "I learn how your brain works and adapt. The more we study, the smarter we both get.",
    image: "/assets/brain.png",
    imageStyle: { maxWidth: "36%" },
  },
];

const Onboarding: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      navigate("/get-started");
    }
  };

  const skipOnboarding = () => {
    navigate("/get-started");
  };

  return (
    <div className="onboarding-wrapper">
      <div className="onboarding-container">
        <header className="onboarding-header">
          <div className="logo">
            <img src="/assets/icons/Simbi-logo.png" alt="Simbi Logo" />
          </div>

          <div className="language-fixed">
            <p className="language-site">
              SITE LANGUAGE{" "}
              <span className="Language-english">
                ENGLISH{" "}
                <span>
                  <img
                    src="/assets/icons/Flag-US.png"
                    alt="US-logo"
                    width={"18px"}
                    height={"12px"}
                  />
                </span>
              </span>
            </p>
          </div>
        </header>

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
                  className={`dot ${index === currentIndex ? "active" : "dot"}`}
                ></span>
              ))}
            </div>
            <div className="button-group">
              <button className="next" onClick={nextSlide}>
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
  );
};

export default Onboarding;
