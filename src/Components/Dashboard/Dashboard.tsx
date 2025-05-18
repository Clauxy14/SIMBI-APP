import React, { useState, useEffect } from "react";
import Navbar from "../NavBar/NavBar";
import SearchBar from "../Progress/SearchBar";
import Streaks from "../Streaks/Streaks";
import "./Dashboard.css";
import TaskCard from "../TaskCard/TaskCard";
import ProgressOverview from "../Progress/ProgressOverview";

interface Session {
  id?: number;
  subject: string;
  topic: string;
  date: string;
  time: string;
  duration: number;
}

const Dashboard: React.FC = () => {
  const storedUser = localStorage.getItem("simbiUser");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const userName = parsedUser?.name || parsedUser?.given_name || "User";

  const [searchValue, setSearchValue] = useState("");
  const [sessions, setSessions] = useState<Session[]>([]);

  const getToken = (): string | null => {
    return (
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken")
    );
  };

  const fetchSessions = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch("https://simbi-ai.onrender.com/api/sessions", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ FIXED
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch sessions");
        return;
      }

      const data = await res.json();
      const sessionsData = Array.isArray(data) ? data : data.sessions;
      setSessions(sessionsData);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const formatTimeRange = (time: string, duration: number): string => {
    const [hours, minutes] = time.split(":").map(Number);
    const start = new Date();
    start.setHours(hours, minutes, 0, 0);

    const end = new Date(start.getTime() + duration * 60000);

    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    return `${start.toLocaleTimeString([], options)} - ${end.toLocaleTimeString(
      [],
      options
    )}`; // ✅ FIXED
  };

  const isToday = (dateStr: string): boolean => {
    const today = new Date();
    const sessionDate = new Date(dateStr);
    return (
      today.getFullYear() === sessionDate.getFullYear() &&
      today.getMonth() === sessionDate.getMonth() &&
      today.getDate() === sessionDate.getDate()
    );
  };

  const todaySessions = sessions.filter((session) => isToday(session.date));

  return (
    <div className="dashboard-container">
      <div className="dashboard-navbar">
        <Navbar />
      </div>
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
        </header>
        <main className="dashboard-main">
          <SearchBar
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={() => {
              // Optional: implement actual search
            }}
          />

          <div className="welcome">
            <h1>Hi, {userName}!</h1>
            <p className="subtitle">
              Ready to make today count?
              <br />
              Let's hit those study goals — one step at a time
            </p>
            <img
              src="/assets/simbi-welcome.svg"
              className="welcome-logo"
              alt="Welcome"
            />
          </div>

          <h2>Daily Streak</h2>
          <section className="daily-streak">
            <Streaks />
          </section>

          <h2>Today's Tasks</h2>
          <section className="tasks">
            {todaySessions.length > 0 ? (
              todaySessions.map((session, index) => (
                <TaskCard
                  key={session.id || index}
                  subject={session.subject}
                  topic={session.topic}
                  time={formatTimeRange(session.time, session.duration)}
                  progress={0} // You can update this later
                />
              ))
            ) : (
              <div className="no-sessions">
                <p>No study sessions scheduled for today</p>
              </div>
            )}
          </section>
        </main>
      </div>
      <div className="progress-overview">
        <ProgressOverview />
      </div>
    </div>
  );
};

export default Dashboard;
