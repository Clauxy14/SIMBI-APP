import React from "react";
import "./Streaks.css";

const daysOfWeek = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thur", "Fri"];

// Mock data: task completion status for each day
const taskCompletedThisWeek: boolean[] = [true, true, false, true, false, true, false];
// This should be replaced with actual data from your state management or API

const Streaks: React.FC = () => {
  return (
    <div className="wrapper">
        <h2>Daily Streak</h2>
      <div className="week-container">
        {daysOfWeek.map((day, index) => (
          <div className="day" key={index}>
            <span>{day}</span>
            <div className={`circle ${taskCompletedThisWeek[index] ? "selected" : ""}`}>
              {taskCompletedThisWeek[index] ? "✓" : ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Streaks;
