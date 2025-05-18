import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Quiz.css";
import { toast } from "react-toastify";

interface Question {
  question: string;
  options: string[];
  correct_answer: string;
}

interface QuizData {
  _id: string;
  userId: string;
  topic: string;
  academicLevel: string;
  difficulty: string;
  numberOfQuestions: number;
  duration: number;
  questions: Question[];
  answers: string[];
  progress: number;
}

const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api/quiz`;

export default function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};

  const [quizId, setQuizId] = useState<string>(state.quizId || "");
  const [questions, setQuestions] = useState<Question[]>(
    Array.isArray(state.questions) ? state.questions : []
  );
  const [answers, setAnswers] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState((state.duration || 5) * 60);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getAuthToken = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Session expired. Please login again.");
      navigate("/login");
      return null;
    }
    return token;
  };

  // Fallback quiz generation
  useEffect(() => {
    if (!state.questions || !state.quizId) {
      const generateQuiz = async () => {
        setIsLoading(true);
        const token = getAuthToken();
        if (!token) return;

        try {
          const res = await fetch(`${API_BASE}/generate`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              topic: "General",
              academicLevel: "secondary",
              numberOfQuestions: 5,
              duration: 5,
              difficulty: "medium",
            }),
          });

          if (res.status === 401) {
            localStorage.removeItem("authToken");
            navigate("/login");
            return;
          }

          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Error ${res.status}: ${errorText}`);
          }

          const resJson = await res.json();

          if (!resJson.success || !resJson.data || !resJson.data.questions) {
            throw new Error("Invalid response format");
          }

          const data: QuizData = resJson.data;
          setQuestions(data.questions);
          setQuizId(data._id);
          setAnswers([]);
          setProgress(0);
          setTimeLeft((data.duration || 5) * 60);
        } catch (error) {
          console.error("Quiz generation error:", error);
          toast.error("Failed to generate quiz. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };
      generateQuiz();
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsTimeUp(true);
      handleFinishQuiz();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleOptionClick = async (option: string) => {
    if (selectedOption) return;

    const token = getAuthToken();
    if (!token) return;

    const correct = questions[currentIndex]?.correct_answer;
    setSelectedOption(option);
    setCorrectAnswer(correct);

    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = option;
    setAnswers(updatedAnswers);

    const updatedProgress = currentIndex + 1;
    setProgress(updatedProgress);

    try {
      const response = await fetch(`${API_BASE}/${quizId}/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          questionIndex: currentIndex,
          answer: option,
          progress: updatedProgress,
        }),
      });

      if (response.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to save answer: ${response.status}`);
      }
    } catch (error) {
      console.error("Answer submission error:", error);
      toast.error(
        "Failed to save your answer. It will still be counted locally."
      );
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setCorrectAnswer(null);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = async () => {
    const token = getAuthToken();
    if (!token) return;

    try {
      await fetch(`${API_BASE}/${quizId}/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          completed: true,
          finalProgress: progress,
        }),
      });
    } catch (error) {
      console.error("Quiz completion error:", error);
    } finally {
      navigate("/result", { state: { quizId } });
    }
  };

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel this quiz?")) {
      navigate("/home");
    }
  };

  if (isLoading) {
    return <div className="loading-message">Loading quiz...</div>;
  }

  if (!isLoading && (!Array.isArray(questions) || questions.length === 0)) {
    return <div className="loading-message">No questions available</div>;
  }

  const question = questions[currentIndex];
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <span>
          {currentIndex + 1}/{questions.length}
        </span>
        <span>{isTimeUp ? "Time's up!" : formatTime(timeLeft)}</span>
        <button className="cancel-btn" onClick={handleCancel}>
          ×
        </button>
      </div>

      <div className="progress-bar">
        <div
          className="quiz-progress"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <h2 className="question">{question.question}</h2>
      <div className="options">
        {question.options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleOptionClick(opt)}
            className={`option-btn
              ${
                selectedOption === opt && opt === correctAnswer ? "correct" : ""
              }
              ${selectedOption === opt && opt !== correctAnswer ? "wrong" : ""}
            `}
            disabled={!!selectedOption}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="quiz-footer">
        <button
          onClick={handleNext}
          className="next-btn"
          disabled={!selectedOption && !isTimeUp}
        >
          {currentIndex === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
