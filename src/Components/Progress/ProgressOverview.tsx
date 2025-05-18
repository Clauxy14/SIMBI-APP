import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import "./ProgressOverview.css";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip);

interface Session {
  id?: number;
  subject: string;
  topic: string;
  date: string;
  time: string;
  duration: number;
}

const ProgressOverview: React.FC = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    data: [] as number[],
    colors: ["#EF4444", "#10B981", "#3B82F6", "#FACC15", "#8B5CF6", "#EC4899"],
  });

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
      calculateChartData(sessionsData);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  const calculateChartData = (sessionsData: Session[]) => {
    const subjectMap = new Map<string, number>();
    let totalSessions = 0;

    sessionsData.forEach((session) => {
      const current = subjectMap.get(session.subject) || 0;
      subjectMap.set(session.subject, current + 1);
      totalSessions++;
    });

    const labels: string[] = [];
    const data: number[] = [];

    subjectMap.forEach((count, subject) => {
      labels.push(subject);
      data.push(Math.round((count / totalSessions) * 100));
    });

    setChartData((prev) => ({
      ...prev,
      labels,
      data,
    }));
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        data: chartData.data,
        backgroundColor: chartData.colors,
        borderWidth: 0,
        cutout: "80%",
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
  };

  return (
    <div className="progress-overview-container">
      <h2>Project Overview</h2>

      <div className="progress-chart-container">
        <p className="chart-title">Completion Rate</p>

        <div className="chart-wrapper">
          <Doughnut data={data} options={options} />
        </div>

        <div className="chart-legend">
          {chartData.labels.map((subject, index) => (
            <div key={index}>
              <span
                className="dot"
                style={{ backgroundColor: chartData.colors[index] }}
              />
              &nbsp;&nbsp;&nbsp;{subject}&nbsp;&nbsp;
              <span className="percent">{chartData.data[index]}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <button className="quick-btn-ask" onClick={() => navigate("/askSimbi")}>
          Ask Simbi
        </button>

        <button
          className="quick-btn-quiz"
          onClick={() => navigate("/QuizPage")}
        >
          Take Quiz
        </button>
      </div>
    </div>
  );
};

export default ProgressOverview;
