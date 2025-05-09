import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./QuizPage.css";

const QuizPage: React.FC = () => {
  const navigate = useNavigate();

  // ✅ Track state for difficulty (already done)
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  // ✅ (Optional): If you want to validate these too
  // const [selectedSubject, setSelectedSubject] = useState("");
  // const [selectedDuration, setSelectedDuration] = useState("");

  const startQuiz = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validate difficulty selection
    if (!selectedDifficulty) {
      alert("Please select a difficulty level.");
      return;
    }

    console.log("Selected difficulty:", selectedDifficulty);
    navigate("/quiz"); // ✅ Navigate only after validation
  };

  const storedUser = localStorage.getItem("simbiUser");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const userName = parsedUser?.name || parsedUser?.given_name || "User";

  return (
    <div className="quiz">
      <div className="navbar-container">
        <NavBar />
      </div>
      <div className="quiz-form-container">
        {/* ✅ Attach startQuiz to the form */}
        <form onSubmit={startQuiz} className="quiz-form">
          <div className="quiz-card">
            <img src="/assets/small-logo-blue.svg" className="quiz-logo" />
            <h1>{`Welcome ${userName}`}</h1>
            <p>
              Did you know? With SIMBI by your side, you're 3x more likely to
              stay on track with your study goals!
            </p>
            <p>
              Your AI Study Buddy isn't just smart — it's your secret weapon for
              academic success.
            </p>
          </div>

          <div className="quiz-selection">
            {/* topic, academic level, no. of questions */}

            {/* Subject Dropdown */}
            <div className="quiz-type">
              <label className="quiz-label">Choose Quiz</label>
              <br />
              <select className="quiz-dropdown" required>
                <option value="" disabled selected>
                  Subject
                </option>
                <option value="English">English Language</option>
                <option value="Biology">Biology</option>
                <option value="Accounting">Accounting</option>
                <option value="Mathematics">Mathematics</option>
              </select>
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
              <select className="quiz-dropdown" required>
                <option value="" disabled selected>
                  Select
                </option>
                <option value="15 Minutes">15 Minutes</option>
                <option value="25 Minutes">25 Minutes</option>
                <option value="30 Minutes">30 Minutes</option>
                <option value="45 Minutes">45 Minutes</option>
              </select>
            </div>

            {/* ✅ Submit button triggers form validation */}
            <div className="start-quiz">
              <button type="submit" className="start-button">
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizPage;
