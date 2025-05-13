import React from "react";
import "./Streaks.css";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Mock data: task completion status for each day
const taskCompletedThisWeek: boolean[] = [true, true, true, true, true, true, false];
// This should be replaced with actual data from your state management or API

const Streaks: React.FC = () => {
  return (
    <div className="wrapper">
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
