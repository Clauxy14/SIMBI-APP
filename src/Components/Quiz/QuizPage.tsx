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

    const token = localStorage.getItem("authToken"); // Get token from localStorage

    if (!token) {
      alert("No token found, please log in.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/quiz/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Include the Bearer token in the headers
        },
        body: JSON.stringify(quizData),
      });

      if (!response.ok) throw new Error("Quiz generation failed");

      const data = await response.json();
      navigate("/quiz", {
        state: { questions: data.questions, quizId: data._id, duration: quizData.duration },
      });
    } catch (error) {
      console.error("Error generating quiz:", error);
      alert("There was an error creating the quiz. Please try again.");
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
            <p>Did you know? With SIMBI by your side, you're 3x more likely to stay on track with your study goals!</p>
            <p>Your AI Study Buddy isn't just smart — it's your secret weapon for academic success.</p>
          </div>

          <div className="quiz-selection">
            <div className="quiz-type">
              <label>Choose Quiz</label><br />
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
              <label>Academic Level<br />
                <select
                  required
                  value={academicLevel}
                  onChange={(e) => setAcademicLevel(e.target.value)}
                  className="quiz-dropdowns"
                >
                  <option value="" disabled>Select</option>
                  <option value="secondary">Secondary School</option>
                  <option value="university">University</option>
                  <option value="personal">Personal Development</option>
                </select>
              </label>

              <label>Number of Questions<br />
                <select
                  required
                  value={numberOfQuestions}
                  onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
                  className="quiz-dropdowns"
                >
                  <option value="" disabled>Select</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
              </label>
            </div>

            <div className="difficulty">
              <label>Difficulty Level</label><br />
              <div className="difficulty-buttons" role="radiogroup" aria-label="Difficulty Level">
                {["easy", "medium", "hard"].map((level) => (
                  <button
                    type="button"
                    key={level}
                    role="radio"
                    aria-checked={selectedDifficulty === level}
                    className={`difficulty-btn ${selectedDifficulty === level ? "active" : ""}`}
                    onClick={() => setSelectedDifficulty(level)}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="duration">
              <label>Duration</label><br />
              <select
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="quiz-dropdown"
              >
                <option value="" disabled>Select</option>
                <option value="5">5 Minutes</option>
                <option value="10">10 Minutes</option>
                <option value="15">15 Minutes</option>
                <option value="20">20 Minutes</option>
              </select>
            </div>

            <div className="start-quiz">
              <button type="submit" className="start-button">Start Quiz</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizPage;
