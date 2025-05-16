import React from "react";
import "./sessionstats.css";

interface SessionStatsProps {
  timeElapsed: string; // Format: "60:00"
  nextBreakInMinutes: number;
  completedSessions: number;
  totalSessions: number;
  onBreakClick: () => void;
}

const SessionStats: React.FC<SessionStatsProps> = ({
  timeElapsed,
  nextBreakInMinutes,
  completedSessions,
  totalSessions,
  onBreakClick,
}) => {
  return (
    <div className="stats-container">
      <h2 className="stats-title">Session Statistics</h2>

      <div className="stats-boxes">
        <div className="stats-box">
          <p className="stats-label">Time Elapsed</p>
          <p className="stats-value">{timeElapsed} mins</p>
        </div>

        <div className="stats-box">
          <p className="stats-label">Next Break</p>
          <p className="stats-value">in {nextBreakInMinutes} mins</p>
        </div>
      </div>

      <div className="stats-box center-box">
        <p className="stats-label">Completed</p>
        <p className="stats-value">
          {completedSessions}/{totalSessions}
        </p>
      </div>

      <button className="break-button" onClick={onBreakClick}>
        Take a Break
      </button>
    </div>
  );
};

export default SessionStats;
