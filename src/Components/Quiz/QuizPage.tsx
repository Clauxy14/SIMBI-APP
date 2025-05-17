import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./QuizPage.css";
import HeadBar from "../headBar/headBar";

const QuizPage: React.FC = () => {
  const navigate = useNavigate();

  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(
    null
  );

  useEffect(() => {
    const stored = localStorage.getItem("simbiUser");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser({
        name: parsed.name || parsed.given_name || "User",
        avatar:
          parsed.avatar ||
          `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
            parsed.name || "User"
          )}`,
      });
    }
  }, []);

  const startQuiz = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDifficulty || !selectedSubject || !selectedDuration) {
      alert("Please select subject, difficulty, and duration.");
      return;
    }

    console.log("Selected difficulty:", selectedDifficulty);
    navigate("/quiz", {
      state: {
        subject: selectedSubject,
        difficulty: selectedDifficulty,
        duration: selectedDuration,
      },
    });
  };

  return (
    <div className="quiz">
      <div className="navbar-container">
        <NavBar />
      </div>

      <div className="user-info-wrapper">       
          <HeadBar/>
      </div>

      <div className="quiz-form-wrapper">
        <div className="quiz-form-container">
          <form onSubmit={startQuiz} className="quiz-form">
            <div className="quiz-card">
              <img src="/assets/small-logo-blue.svg" className="quiz-logo" />
              <h1>{`Welcome ${user?.name}`}</h1>

              <p className="quiz-p">
                Did you know? With SIMBI by your side, you're 3x more likely to
                stay on track with your study goals!
              </p>
              <p className="quiz-p">
                Your AI Study Buddy isn't just smart — it's your secret weapon
                for academic success.
              </p>
            </div>

            <div className="quiz-selection">
              {/* Subject Dropdown */}
              <div className="quiz-type">
                <label className="quiz-label">Choose Quiz</label>
                <br />

                <input
                  type="text"
                  className="quiz-input"
                  required
                  value={selectedSubject}
                  placeholder="Input Topic"
                  onChange={(e) => setSelectedSubject(e.target.value)}
                />
              </div>

              {/* Difficulty Buttons */}
              <div className="difficulty">
                <label className="quiz-label">Difficulty Level</label>
                <br />
                <div
                  className="difficulty-buttons"
                  role="radiogroup"
                  aria-label="Difficulty Level"
                >
                  {["easy", "medium", "hard"].map((level) => (
                    <button
                      type="button"
                      key={level}
                      role="radio"
                      aria-checked={selectedDifficulty === level}
                      className={`difficulty-btn ${
                        selectedDifficulty === level ? "active" : ""
                      }`}
                      onClick={() => setSelectedDifficulty(level)}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration Dropdown */}
              <div className="duration">
                <label className="quiz-label">Duration</label>
                <br />
                <select
                  className="quiz-dropdown"
                  required
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="15 Minutes">15 Minutes</option>
                  <option value="25 Minutes">25 Minutes</option>
                  <option value="30 Minutes">30 Minutes</option>
                  <option value="45 Minutes">45 Minutes</option>
                </select>
              </div>

              <div className="start-quiz">
                <button type="submit" className="start-button">
                  Next
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;

//
