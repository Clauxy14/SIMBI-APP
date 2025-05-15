import { Link } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AboutUs.css";
import Footer from "./Footer";

function AboutUs() {
  const navigate = useNavigate();
  const footerRef = useRef<HTMLElement | null>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="AboutUs">
      <header className="abt">
        <div className="abt-navbar">
          <div className="lp-logo">
            <img src="/assets/icons/Simbi-logo.svg" alt="" />
          </div>
          <nav>
            <a onClick={scrollToFooter} style={{ cursor: "pointer" }}>
              Contact Us
            </a>
            <Link to="/landingpage">Home</Link>
            <Link to="/signup" className="lp-sign-in">
              Sign In
            </Link>
          </nav>
        </div>
        <section className="abt-container">
          <h2>
            We’re on a mission to make studying less stressful and more fun{" "}
            <span>
              <img src="/assets/icons/Simbii.svg" alt="" />
            </span>
          </h2>
          <p>
            Born from late-night cramming and a love for tech, Simbi is designed
            to help every student thrive — one smart study session at a time.
          </p>
          <button className="jsimbi" onClick={() => navigate("/signup")}>
            Join Simbi Today
          </button>
        </section>
      </header>
      <main className="story">
        <section className="story">
          <div className="story-img">
            <img src="/assets/unsplash_F19tSxhQ6QI.svg" alt="" />
            <img src="/assets/unsplash_IgUR1iX0mqM.svg" alt="" />
            <img src="/assets/unsplash_rg1y72eKw6o.svg" alt="" />
            <img src="/assets/unsplash_ykHdJL_nVeo.svg" alt="" />
          </div>
          <div className="our-story">
            <h1>Our Story</h1>
            <div className="p">
              <p>
                Simbi was born out of a shared frustration: studying felt like a
                lonely, boring, and sometimes overwhelming journey for many
                students. We realized students needed more than just access to
                notes or practice questions—they needed a study companion.
                That’s how Simbi came to life—a friendly, AI-powered buddy built
                to make studying feel personal, fun, and motivational.
              </p>
              <p>
                From our early sketches to product testing with real students in
                Nigeria, Simbi has grown into more than an app—it’s become a
                movement for smarter, more enjoyable learning. Whether it's
                generating a quiz in seconds, giving a motivational boost before
                exams, or celebrating small wins, Simbi is here to support every
                learner’s journey.
              </p>
            </div>
          </div>
        </section>
        <section className="our-value">
          <div className="value-p">
            <h2>Our Core Values</h2>
            <p>What we stand for</p>
          </div>
          <div className="values">
            <div className="value">
              <div>
                <img src="/assets/icons/open-book.svg" alt="" />
              </div>
              <div>
                <h4>Empower Through Education</h4>
                <p>Earn badges, build streaks, and celebrate every study win</p>
              </div>
            </div>
            <div className="value">
              <div>
                <img src="/assets/icons/chat.svg" alt="" />
              </div>
              <div>
                <h4>Tech With Heart</h4>
                <p>
                  Ask questions, get study tips, or stay hyped — SIMBI’s always
                  got your back.
                </p>
              </div>
            </div>
            <div className="value">
              <div>
                <img src="/assets/icons/circle.svg" alt="" />
              </div>
              <div>
                <h4>Always Improving</h4>
                <p>
                  Your goals, your pace. Get daily study plans that fit your
                  vibe.
                </p>
              </div>
            </div>
            <div className="value">
              <div>
                <img src="/assets/icons/chart.svg" alt="" />
              </div>
              <div>
                <h4>Progress, Not perfection</h4>
                <p>
                  Practice smarter with instant feedback and quizzes tailored to
                  you.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="value-media">
          <h2>As seen on</h2>
          <div className="value-logos">
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
      </main>
      <Footer ref={footerRef} />
    </div>
  );
}

export default AboutUs;
