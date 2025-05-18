import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./QuizPage.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("simbiUser");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const userName = parsedUser?.name || parsedUser?.given_name || "User";

  const [topic, setTopic] = useState("");
  const [academicLevel, setAcademicLevel] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [duration, setDuration] = useState("5");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const startQuiz = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDifficulty) {
      alert("Please select a difficulty level.");
      return;
    }

    const quizData = {
      topic,
      academicLevel,
      numberOfQuestions,
      duration: Number(duration),
      difficulty: selectedDifficulty,
    };

    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("No token found, please log in.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/quiz/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(quizData),
      });

      let resJson;
      try {
        resJson = await response.json();
      } catch (err) {
        console.error("❌ Failed to parse JSON from response", err);
        throw new Error("Invalid response format from server");
      }

      if (!response.ok || !resJson.success || !resJson.data) {
        console.error("❌ Backend error response:", resJson);
        throw new Error(resJson.message || "Quiz generation failed");
      }

      const quiz = resJson.data;

      // ✅ Save to localStorage (optional backup)
      localStorage.setItem(
        "quizData",
        JSON.stringify({
          questions: quiz.questions,
          quizId: quiz._id,
          duration: quiz.duration,
        })
      );

      // ✅ Navigate with correct state
      navigate("/quiz", {
        state: {
          questions: quiz.questions,
          quizId: quiz._id,
          duration: quiz.duration,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("❌ Error generating quiz:", error.message);
        alert(
          error.message ||
            "There was an error creating the quiz. Please try again."
        );
      } else {
        console.error("❌ Unknown error generating quiz:", error);
        alert("An unknown error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="quiz">
      <div className="navbar-container">
        <NavBar />
      </div>

      <div className="quiz-form">
        <form onSubmit={startQuiz}>
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
            <div className="quiz-type">
              <label>Choose Quiz</label>
              <br />
              <input
                type="text"
                placeholder="Enter a topic"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="topic"
              />
            </div>

            <div className="academic-level">
              <label>
                Academic Level
                <br />
                <select
                  required
                  value={academicLevel}
                  onChange={(e) => setAcademicLevel(e.target.value)}
                  className="quiz-dropdowns"
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="secondary">secondary</option>
                  <option value="university">university</option>
                  <option value="personal development">
                    personal development
                  </option>
                </select>
              </label>

              <label>
                Number of Questions
                <br />
                <select
                  required
                  value={numberOfQuestions}
                  onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
                  className="quiz-dropdowns"
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
              </label>
            </div>

            <div className="difficulty">
              <label>Difficulty Level</label>
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

            <div className="duration">
              <label>Duration</label>
              <br />
              <select
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="quiz-dropdown"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="5">5 Minutes</option>
                <option value="10">10 Minutes</option>
                <option value="15">15 Minutes</option>
                <option value="20">20 Minutes</option>
              </select>
            </div>

            <div className="start-quiz">
              <button type="submit" className="start-button">
                Start Quiz
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizPage;
