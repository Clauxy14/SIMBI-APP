import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import "./studyplaaan.css";

interface Session {
  id?: number;
  subject: string;
  topic: string;
  date: string;
  time: string;
  duration: number;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const BEARER_TOKEN =
  localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

console.log("Token:", BEARER_TOKEN);

if (!BEARER_TOKEN) {
  console.warn("Auth token not found. User might not be logged in.");
}

const STUDYPLAAAN: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Session>({
    subject: "",
    topic: "",
    date: "",
    time: "",
    duration: 60,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const fetchSessions = async () => {
    try {
      const res = await fetch("https://simbi-ai.onrender.com/api/sessions", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          alert("Session expired or unauthorized. Please log in again.");
          throw new Error("401 Unauthorized");
        }
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      console.log("Fetched sessions data:", data);

      if (Array.isArray(data)) {
        setSessions(data);
      } else if (Array.isArray(data.sessions)) {
        setSessions(data.sessions);
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const addSession = async () => {
    try {
      console.log("Posting form data:", formData);
      const res = await fetch("https://simbi-ai.onrender.com/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({
          subject: "",
          topic: "",
          date: "",
          time: "",
          duration: 60,
        });
        setShowModal(false);
        setShowSuccess(true);
        fetchSessions();
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        const errorText = await res.text();
        console.error("Failed to add session. Response:", errorText);
      }
    } catch (error) {
      console.error("Error posting session:", error);
    }
  };

  const isSameDay = (date1: string, date2: string): boolean => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const formattedToday = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="studyplan-container">
      <div className="studyplan-navbar">
        <NavBar />
      </div>
      <div className="studyplan-content">
        <header className="studyplan-header">
          <h1>Your Study Plan</h1>
          <div className="studyplan-header-button">
            <button
              onClick={() => setShowModal(true)}
              className="studyplan-add-btn"
            >
              + Add Session
            </button>
            <button
              onClick={() => navigate("/AskSimbi")}
              className="studyplan-ask-btn"
            >
              Ask Simbi
            </button>
          </div>
        </header>

        <div className="section">
          <h2>Today</h2>
          <p>{formattedToday}</p>

          {sessions
            .filter((s) => isSameDay(s.date, new Date().toISOString()))
            .map((s, i) => (
              <div
                key={s.id || i}
                className="session-card-1"
                onClick={() => navigate("/studySession")}
              >
                <div>
                  <strong>{s.subject}</strong>
                  <p>{s.topic}</p>
                  <span>
                    {formatDate(s.date)} at {s.time} ({s.duration} minutes)
                  </span>
                </div>
                <div>→</div>
              </div>
            ))}
        </div>

        <div className="section">
          <h2>All Scheduled Sessions</h2>
          {sessions.map((s, i) => (
            <div
              key={s.id || i}
              className="session-card-2"
              onClick={() => navigate("/studySession")}
            >
              <div>
                <strong>{s.subject}</strong>
                <p>{s.topic}</p>
                <span>
                  {formatDate(s.date)} at {s.time} ({s.duration} minutes)
                </span>
              </div>
              <div>→</div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Add Study Session</h3>
              <input
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              />
              <input
                placeholder="Topic"
                value={formData.topic}
                onChange={(e) =>
                  setFormData({ ...formData, topic: e.target.value })
                }
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
              <input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
              />
              <select
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: Number(e.target.value) })
                }
              >
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
                <option value={180}>3 hours</option>
              </select>
              <div className="modal-buttons">
                <button onClick={() => setShowModal(false)}>Cancel</button>
                <button onClick={addSession}>Add Session</button>
              </div>
            </div>
          </div>
        )}

        {showSuccess && (
          <div className="success-popup">
            Your session has been added to your schedule successfully
          </div>
        )}
      </div>
    </div>
  );
};

export default STUDYPLAAAN;
