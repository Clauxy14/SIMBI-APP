import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./Result.css";

interface ScoreData {
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  passed: boolean;
}

const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api/quiz`;

// Helper to get auth token from localStorage
const getAuthToken = () => localStorage.getItem("authToken");

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const quizId = location.state?.quizId;

  const [score, setScore] = useState<ScoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [retakeLoading, setRetakeLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScore = async () => {
      const token = getAuthToken();
      if (!token) {
        setError("Not authenticated. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/${quizId}/score`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch score");
        const data = await res.json();
        setScore(data);
      } catch (err) {
        setError("Error loading your score. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (quizId) {
      fetchScore();
    } else {
      setError("No quiz ID found. Redirecting...");
      setTimeout(() => navigate("/home"), 2000);
    }
  }, [quizId]);

  const handleRetake = async () => {
    if (!quizId) return;

    const token = getAuthToken();
    if (!token) {
      setError("Not authenticated. Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    setRetakeLoading(true);
    try {
      const res = await fetch(`${API_BASE}/${quizId}/retake`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to retake quiz");

      const data = await res.json();
      navigate("/quiz", {
        state: {
          quizId: data._id,
          questions: data.questions,
          duration: data.duration || 5,
        },
      });
    } catch (err) {
      setError("Could not retake quiz. Please try again.");
    } finally {
      setRetakeLoading(false);
    }
  };

  if (loading) return <div className="result-container">Loading result...</div>;
  if (error) return <div className="result-container error">{error}</div>;
  if (!score) return null;

  return (
    <div className="result-container">
      <div>
        <NavBar />
      </div>
      <h2>Quiz Complete 🎉</h2>
      <p>You got <strong>{score.correctAnswers}</strong> out of <strong>{score.totalQuestions}</strong> questions correct.</p>
      <p>Your Score: <strong>{score.percentage}%</strong></p>
      <p>Status: <strong className={score.passed ? "passed" : "failed"}>
        {score.passed ? "Passed ✅" : "Failed ❌"}
      </strong></p>

      <div className="result-actions">
        <button onClick={handleRetake} disabled={retakeLoading}>
          {retakeLoading ? "Retaking..." : "Retake Quiz"}
        </button>
        <button onClick={() => navigate("/dashboard")}>Back to Home</button>
      </div>
    </div>
  );
}

