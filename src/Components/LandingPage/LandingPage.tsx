import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Footer from "./Footer";

function LandingPage() {
  const navigate = useNavigate();

  const footerRef = useRef<HTMLElement | null>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqData = [
    {
      question: "Is SIMBI free?",
      answer: "Yes, SIMBI is completely free to use.",
    },
    {
      question: "Do I need to be tech-savvy?",
      answer: "No, SIMBI is designed for users of all skill levels.",
    },
    {
      question: "What subjects / courses does SIMBI cover?",
      answer: "SIMBI covers a wide range of subjects from math to languages.",
    },
    {
      question: "How do the NFT rewards work?",
      answer:
        "NFT rewards are earned by completing learning tasks and can be redeemed in the rewards store.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className=" lp-container">
      <header className="lp-navbar">
        <div className="lp-logo">
          <img src="/assets/icons/Simbi-logo.svg" alt="" />
        </div>
        <nav>
          <a onClick={scrollToFooter} style={{ cursor: "pointer" }}>
            Contact Us
          </a>
          <Link to="/about">About Us</Link>
          <Link to="/signup" className="lp-sign-in">
            Sign In
          </Link>
        </nav>
      </header>

      <section className="lp-simbikick">
        <div className="lp-simbikick-text">
          <h1>
            <span className="lp-highlight">Smarter Studying</span>
            <br />
            Starts Here
          </h1>
          <p>
            Meet SIMBI — Your AI-powered study buddy for personalized plans,
            quizzes, rewards & more
          </p>
          <div className="lp-hero-buttons">
            <button className="get-started" onClick={() => navigate("/signup")}>
              Get Started
            </button>
            <button className="have-account" onClick={() => navigate("/login")}>
              Already Have An Account
            </button>
          </div>
        </div>
        <div className="lp-hero-image hero-kick">
          <img src="/assets/SimbiKick.svg" alt="simbikick" />
        </div>
      </section>

      <section className="lp-media-section">
        <h2>As seen on</h2>
        <div className="lp-media-logos">
          <span>
            <img src="/assets/icons/medium.svg" alt="" />
          </span>
          <span>
            <img src="/assets/icons/Edsurge.svg" alt="" />
          </span>
          <span>
            <img src="/assets/icons/youtube.svg" alt="" />
          </span>
          <span>
            <img src="/assets/icons/zikoko.svg" alt="" />
          </span>
          <span>
            <img src="/assets/icons/product-hunt.svg" alt="" />
          </span>
        </div>
      </section>

      <section className="lp-features">
        <div className="lp-features-character">
          <img src="/assets/meet-simbi.svg" alt="" />
        </div>
        <div>
          <div className="lp-features-list">
            <h2>Features</h2>
          </div>
          <div className="lp-feats">
            <div className="lp-feature">
              <div>
                <img src="/assets/icons/yellowtrophy.svg" alt="" />
              </div>
              <div>
                <h4>Unlock achievements & stay motivated</h4>
                <p>
                  Earn badges, build streaks, and celebrate every study win.
                </p>
              </div>
            </div>
            <div className="lp-feature">
              <div>
                <img src="/assets/icons/personalized.svg" alt="" />
              </div>
              <div>
                <h4>Personalized Study Plans</h4>
                <p>
                  You pick your pace. Get daily study plans that fit your vibe.
                </p>
              </div>
            </div>
            <div className="lp-feature">
              <div>
                <img src="/assets/icons/chat.svg" alt="" />
              </div>
              <div>
                <div>
                  <h4>SIMBI AI Chat Assistant</h4>
                  <p>
                    Ask questions, get study tips, or stay hyped — SIMBIs always
                    got your back.
                  </p>
                </div>
              </div>
            </div>
            <div className="lp-feature">
              <div>
                <img src="/assets/icons/yellowbook.svg" alt="" />
              </div>
              <div>
                <h4>Custom Quizzes with Feedback</h4>
                <p>
                  Practice smarter with instant feedback and quizzes tailored to
                  you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="how-it-works">
        <h2>How it Works</h2>
        <div className="works">
          <div>
            <img src="/assets/Free-iPhone.svg" alt="15-pro" />
          </div>
          <div className="sim-talk">
            <img src="/assets/Group-1000007163.svg" alt="path-way" />
            <button className="jsimbi" onClick={() => navigate("/signup")}>
              Join Simbi Today
            </button>
          </div>
        </div>
      </section>
      <section className="testimonials-section">
        <h2 className="testimonials-heading">Testimonials From Students</h2>

        <div className="testimonials-container">
          <div className="testimonial-card">
            <div className="stars">
              <img src="/assets/icons/stars.svg" alt="" />
            </div>
            <h4>SIMBI made studying fun!</h4>
            <p className="quote">
              “I used to dread reading, but now I actually look forward to my
              daily streaks and quizzes. SIMBI feels like a study buddy that
              truly understands me!”
            </p>
            <p className="author">— Chidera A., 100 Level Student, UNILAG</p>
          </div>

          <div className="testimonial-card">
            <div className="stars">
              <img src="/assets/icons/stars.svg" alt="" />
            </div>
            <h4>This app keeps me on track without the stress</h4>
            <p className="quote">
              “The personalized plans and motivational chats with SIMBI help me
              stay focused — even on days when I feel tired. Its like having a
              coach in my pocket.”
            </p>
            <p className="author">— Tobi E., SS3 Student, Lagos</p>
          </div>

          <div className="testimonial-card">
            <div className="stars">
              <img src="/assets/icons/stars.svg" alt="" />
            </div>
            <h4>I passed my semester exams thanks to SIMBI</h4>
            <p className="quote">
              “The quizzes, daily reminders, and those funny breaktime memes
              helped me study better and stay relaxed. SIMBI is the best thing I
              downloaded this year.”
            </p>
            <p className="author">— Zainab Y., 200 Level, UI</p>
          </div>
        </div>
      </section>
      <section className="faq-container">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <span>{item.question}</span>
              <span className="arrow">
                {activeIndex === index ? (
                  <img src="/assets/icons/Dropdown.svg"></img>
                ) : (
                  <img src="/assets/icons/Dropdown.svg"></img>
                )}
              </span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">{item.answer}</div>
            )}
          </div>
        ))}
      </section>
      <Footer ref={footerRef} />
    </div>
  );
}

export default LandingPage;
