import React, { useEffect, useState } from "react";
import "./Streaks.css";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Streaks: React.FC = () => {
  const [taskCompletedThisWeek, setTaskCompletedThisWeek] = useState<boolean[]>([false, false, false, false, false, false, false]);

  useEffect(() => {
    // Get today's day index (0 for Monday, 6 for Sunday in our setup)
    const today = new Date().getDay(); // JS: 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const adjustedIndex = today === 0 ? 6 : today - 1; // Convert JS Sunday to 6 for our array

    setTaskCompletedThisWeek((prev) => {
      const updated = [...prev];
      updated[adjustedIndex] = true; // Mark today as complete
      return updated;
    });
  }, []);

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
