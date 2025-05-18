import React from "react";
import "./DailyTasks.css";

type Task = {
  id: number;
  title: string;
  instructor: string;
  tags: string[];
  bgColor: string;
  icon: string;
};

const tasks: Task[] = [
  {
    id: 1,
    title: "Anatomy",
    instructor: "Igwe Ugo Phd",
    tags: ["Heart", "5 Courses", "Beginner"],
    bgColor: "#eef9f2",
    icon: "🫁", // Replace with image path or icon component if needed
  },
  {
    id: 2,
    title: "Legal Method",
    instructor: "C. O Nwuzor, Esq",
    tags: ["Methods", "15 Courses", "Advanced"],
    bgColor: "#fff4ed",
    icon: "⚖️",
  },
  {
    id: 3,
    title: "Intro to Land Law",
    instructor: "Ekwe Ike",
    tags: ["Philosophy", "11 Courses", "Advanced"],
    bgColor: "#f1f3f9",
    icon: "⚖️",
  },
];

const DailyTasks: React.FC = () => {
  return (
    <>

    <div className="daily-tasks-container">
             <h2>Popular Courses</h2>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="task-card"
          style={{ backgroundColor: task.bgColor }}
        >
          <div className="task-content">
            <div className="task-icon">{task.icon}</div>
            <div className="task-info">
              <h3>{task.title}</h3>
              <p>{task.instructor}</p>
              <div className="task-tags">
                {task.tags.map((tag, index) => (
                  <span key={index}>• {tag}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="task-buttons">
            <button className="continue-btn">Continue</button>
            <button className="skip-btn">Skip</button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default DailyTasks;
