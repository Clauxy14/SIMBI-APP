import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    title: "Meet Simbi!",
    description:
      "Not your boring study tool. I am the AI buddy who will keep you awake.",
    image: "/assets/meet-simbi.svg",
    imageStyle: { width: "23%" },
  },
  {
    title: "Cut the Bluff!",
    description:
      "I break down complex stuff into the language you will understand. Academic jargon is allowed here.",
    image: "/assets/Cut-bluff.svg",
    imageStyle: { width: "40%" },
  },
  {
    title: "Tough Love",
    description:
      "Procrastination again? I will call you out. See me as your friend who will never let you slack.",
    image: "/assets/tough-love.png",
    imageStyle: { width: "43%" },
  },
  {
    title: "Brain Hacks",
    description:
      "I learn how your brain works and adapt. The more we study, the smarter we both get.",
    image: "/assets/brain.png",
    imageStyle: { width: "35%" },
  },
];

const Onboarding: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigate("/landingpage");
    }
  };

  const skipOnboarding = () => {
    navigate("/landingpage");
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="w-[95%] h-screen m-auto ">
      <div className="mt-4">
        <img
          src="/assets/icons/Simbi-logo.png"
          alt="Simbi Logo"
          className="w-[10%] max-sm:w-[20%]"
        />
      </div>

      <div className="flex justify-center items-center h-screen">
        <div className="flex max-md:flex-col flex-row max-=;md:w-[90%] justify-center items-center gap-20 w-full max-w-screen-lg">
          <img
            src={currentSlide.image}
            alt="slide visual"
            style={slides[currentIndex].imageStyle}
          />

          <div className="md:w-[39%] w-full text-center md:text-left">
            <h1 className="text-[3rem] max-md:text-[2rem] font-[700] mb-0">
              {currentSlide.title}
            </h1>
            <p className="text-[1.9rem] max-sm:text-[1.3rem] font-[600] mt-2 mb-10 max-sm:w-[85%] max-sm:mx-auto">
              {currentSlide.description}
            </p>

            <div className="flex max-md:justify-center justify-start gap-5 mb-10">
              {slides.map((_, index) => (
                <span
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ease-in ${
                    index === currentIndex
                      ? "w-[75%] bg-[#ffcc00] max-md:w-[50%] rounded-lg"
                      : "w-2 bg-gray-300"
                  }`}
                ></span>
              ))}
            </div>

            <div className="flex flex-col w-full max-md:w-[75%] mx-auto">
              <button
                onClick={nextSlide}
                className="bg-[#3a86ff] hover:bg-[#3a85ffc2] text-[#fff] py-2 w-100%% rounded-xl text-[1.2rem] font-semibold mb-4"
              >
                {currentIndex < slides.length - 1 ? "Next" : "Get Started"}
              </button>
              {currentIndex < slides.length - 1 && (
                <button
                  onClick={skipOnboarding}
                  className="bg-[#3a86ff] hover:bg-[#3a85ffc2] text-[#fff] py-2 w-100%% rounded-xl text-[1.2rem] font-semibold"
                >
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
